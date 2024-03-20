var express = require('express');
var router = express.Router();
var usercontroller = require('../Controller/user')
var blogcontroller = require('../Controller/blog')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

/* GET users listing. */

router.post('/create', usercontroller.sequre , upload.single('image') , blogcontroller.blogcreate );

router.get('/find/', blogcontroller.blogfind );

router.get('/findone/:findId', blogcontroller.blogfindone );

router.delete('/delete/:deleteId', blogcontroller.blogdelete );

router.put('/update/:UpdateId', blogcontroller.blogupdate );

module.exports = router;
