const User = require('../models/user.mod');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config');


exports.getuser = (req, res, next) => {

};
exports.createUser = (req, res, next) => {

    User.findOne({ email: req.body.email }).then(user => {
        if (/* user != null && */ user) {
            return res.status(409).json({
                msg: "the email is already exists",
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    user.save(user)
                        .then(user => {
                            res.status(200).json({
                                msg: "user created successfully",
                                user: user
                            })
                        })
                        .catch(err => {
                            res.status(404).json({
                                error: err
                            })
                        })
                }

            });
        }
    })


};

exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    msg: 'Auth failed , user not found'
                })
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        res.status(401).json({
                            msg: 'Auth failed '
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id,
                        },/* process.env.JWT_KEY */config.JWT_KEY, { expiresIn: "1h" });
                        return res.status(200).json({
                            msg: 'login successful',
                            token: token
                        })
                    }
                    else {
                        res.status(404).json({
                            msg: 'login failed password does not matches'
                        })
                    }
                })
            }

        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.delete = (req, res, next) => {

    User.findOneAndDelete({ _id: req.params.id }).then(result => {
        res.status(200).json({
            msg: "user deleted successfully"
        })
    }).catch(err => {
        res.status(404).json({
            error: err
        })
    })
};

module.exports