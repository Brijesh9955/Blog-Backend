var express = require('express');
var router = express.Router();
var usercontroller = require('../Controller/user')

/* GET home page. */
router.post('/user/signup', usercontroller.usersignup );

router.post('/user/login',usercontroller.userlogin );

router.get('/user/find', usercontroller.sequre,   usercontroller.userfind);

router.delete('/user/delete/:deleteId' , usercontroller.userdelete);

router.put('/user/update/:updateId', usercontroller.userupdate);


module.exports = router;
