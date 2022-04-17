const Order = require('../models/order.model');
const Product = require('../models/product.model');

exports.getOrder=(req, res, next) => {
    Order.find({})
        /* .select("id  quantity") */
        .populate("product")
        .then(order => {

            const response = {
                count: order.length,
                orders: order.map(doc => {
                    return {
                        quantity: doc.quantity,
                        _id: doc._id,
                        product: doc.product,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8000/orders/' + doc._id
                        }
                    }
                })
            }
            if (order.length > 0) {
                res.status(200).json({ result: response });
            } else {
                res.status(200).json({ msg: " there are no ORDERS" });
            }

        }).catch(err => {
            console.log(err);
            res.status(404).json({ error: err })
        })

};

exports.createOrder = (req, res, next) => {
    Product.findById(req.body.productId).then((product) => {
        if (!product) {
            return res.status(404).json({ msg: " product not found" });
        }
        const order = new Order({
            productId: req.body.productId,
            quantity: req.body.quantity,
        });
        order.save().then(() => {
            res.status(200).json({
                msg: "Order created successfully",
                order: order,
            })
        }).catch(err => {
            console.log(err);
            res.status(404).json({
                msg: err,
            })
        });
    }).catch(err => {
        res.status(404).json({ msg: "product not found" });
    })


};

exports.getOneOrder= (req, res, next) => {


    Order.findById({ _id: req.params.id }).then(order => {
        if (!order) {
            res.status(404).json({
                msg: 'Order not found'
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:8080/orders'
            }
        })
    }).catch(err => {
        console.log(err);
    })
};
exports.updateOrder=(req, res, next) => {
    res.send('there is no ORDERS yet/update/')
};
exports.deleteOrder=(req, res, next) => {
    Order.findOneAndDelete({ _id: req.params.id }).then(result => {
        res.status(200).json({ result: result, msg: "delete done" })
    }).catch(err => {
        res.status(404).json({ error: err, msg: "delete failed" })
    })
};


module.exports