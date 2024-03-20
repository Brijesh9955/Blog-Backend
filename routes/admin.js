var express = require('express');
var router = express.Router();
var admincontroller = require('../Controller/admin')

/* GET home page. */

router.post('/signup', admincontroller.adminsignup );

router.post('/login',admincontroller.adminlogin );

router.get('/find', admincontroller.adminfind);

router.delete('/delete/:deleteId' , admincontroller.admindelete);

router.put('/update/:updateId', admincontroller.adminupdate);


module.exports = router;
