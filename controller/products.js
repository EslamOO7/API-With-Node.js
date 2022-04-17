const Product = require('../models/product.model');


exports.getproduct=(req, res, next) => {
    Product.find({}).select("id name price image").then(product => {

        const response = {
            count: product.length,
            products: product.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    image: doc.image,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/products/' + doc._id
                    }
                }
            })
        }
        if (product.length > 0) {
            res.status(200).json({ result: response });
        } else {
            res.status(200).json({ msg: " there are no products" });
        }

    }).catch(err => {
        console.log(err);
        res.status(404).json({ error: err })
    })
};
exports.createproduct=(req, res, next) => {
    console.log(req.file)
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image:req.file.path
    });
    product.save().then(product => {
        res.status(200).json({
            msg: "product add successfully",
            product: product,
        })
    }).catch(err => {
        res.status(404).json({
            msg: "there was an error",
            error: err.message,
        })
    })

}
exports.getOneproduct=(req, res, next) => {

    Product.findById({ _id: req.params.id }).then(product => {
        console.log(product)
        res.status(200).json(product)
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            error: err.message,
        })
    })
}
exports.updateproduct=(req, res, next) => {
    const id = req.params.id
    const Editproduct = {
        name: req.body.name,
        price: req.body.price
    };
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.findOneAndUpdate({ _id: id }, { $set: updateOps }).then(result => {
        res.status(200).json({
            msg: "update product successfully",
            request: {
                type: "GET",
                URL: "http://localhost:8000/products/" + id
            }
        });
    }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
}
exports.deleteproduct=(req, res, next) => {
    Product.remove({ _id: req.params.id }).then(result => {
        res.status(200).json({
            msg: "delete success"
        })
    }).catch(err => {
        res.status(404).json({
            error: err.message,
        })
    })
}






module.exports