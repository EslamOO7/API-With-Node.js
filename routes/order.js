const express = require('express');
const router = express.Router();
const check = require("../middleware/check");
const orderCont= require("../controller/orders")

router.get('/', check,orderCont.getOrder);

router.post('/', check,orderCont.createOrder);
router.get('/:id',check,orderCont.getOneOrder)
router.patch('/:id', check,orderCont.updateOrder)
router.delete('/:id', check,orderCont.deleteOrder)





module.exports = router;