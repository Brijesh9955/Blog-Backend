const bcrypt = require('bcrypt');
var USER = require('../models/user')
var jwt = require('jsonwebtoken');


// user sequre
exports.sequre = async function (req, res, next) {
    try {
        let token = req.headers.usertoken
        if (!token) {
            throw new Error('please send token')
        }
        var decoded = jwt.verify(token, 'SURAT');
        
        // req.userId = decoded.id

        let userCheck = await USER.findById(decoded.id)
        if (!userCheck) {
            throw new Error('user Not Found')
        }
        next()

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


// user signup
exports.usersignup = async function (req, res, next) {
    try {
        let formdata = req.body
        formdata.password = await bcrypt.hash(formdata.password, 8)
        let userCreate = await USER.create(formdata)

        res.status(201).json({
            status: "Success",
            message: "User signup Successfully",
            data: userCreate,
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// user login
exports.userlogin = async function (req, res, next) {
    try {
        let formdata = req.body
        let useremail = await USER.findOne({email : formdata.email})
        if (!useremail) {
            throw new Error("user not found")
        }
        let passComp = await bcrypt.compare(formdata.password, useremail.password)
        if (!passComp) {
            throw new Error("Invalid Password")
        }

        var usertoken = jwt.sign({ id: useremail._id }, 'SURAT');
        console.log(usertoken);

        res.status(201).json({
            status: "Success",
            message: "User login Successfully",
            data : useremail ,
            usertoken
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


// user find
exports.userfind = async function (req, res, next) {
    try {
        let fromdata = req.body
        let userfind = await USER.find(fromdata)

        res.status(201).json({
            status: "Success",
            message: "User all data Successfully",
            data: userfind
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


// user delete
exports.userdelete = async function (req, res, next) {
    try {
        let fromdata = req.body
        let userdelete = await USER.findByIdAndDelete(req.params.deleteId)
        if (!userdelete) {
            throw new Error('user  not found')
        }
        res.status(201).json({
            status: "Success",
            message: "User delete Successfully",
            data: userdelete
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


// user update
exports.userupdate = async function (req, res, next) {
    try {
        let fromdata = req.body
        let userupdate = await USER.findByIdAndUpdate(req.params.updateId, fromdata)
        if (!userupdate) {
            throw new Error('user  not found')
        }
        res.status(201).json({
            status: "Success",
            message: "User update Successfully",
            data: userupdate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}