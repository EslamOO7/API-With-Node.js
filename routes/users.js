var express = require('express');
var router = express.Router();

const userCont = require("../controller/user")

/* GET users listing. */
router.get('/signup', userCont.getuser);

router.post('/signup', userCont.createUser);

router.post('/login', userCont.login);

router.delete("/:id", userCont.delete);

module.exports = router;
