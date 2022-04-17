const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const check = require("../middleware/check");
const productCont= require("../controller/products")
//for upload & saving files
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./image");
    },
    filename: (req, file, cb) => {
        cb(null, /* new Date().toISOString() +  */file.originalname)
    }
});
const fileFilter = (req, file, cb) =>{
    //reject files
    if(file.mimeType === "image/jpeg" || file.mimeType === "image/jpg"){
        cb(null,true);
    }else{
        cb(null,false);
    }
};
const upload = multer({ storage: storage,limits:{fileSize:1024*1024*5},/* fileFilter:fileFilter  */});

router.get('/', productCont.getproduct);


router.post('/',check,upload.single("image"),productCont.createproduct )
router.get('/:id',productCont.getOneproduct)
router.patch('/:id', check,productCont.updateproduct)
router.delete('/:id', check,productCont.deleteproduct)





module.exports = router;