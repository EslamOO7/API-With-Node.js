const jwt = require("jsonwebtoken");
const config = require("../config")


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]||req.body.token
        console.log(token)
        jwt.verify(token,config.JWT_KEY,(err,decoded) => {
            if (err){
                console.log(err)
            }else{
                console.log(decoded)
                next();
            }
        });
        
       
    } catch (err) {
        return res.status(401).json({ message: "Error verifying in token" })
    }



}