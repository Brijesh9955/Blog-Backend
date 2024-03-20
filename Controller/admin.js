var ADMIN = require('../models/admin')
const bcrypt = require('bcrypt');

// var jwt = require('jsonwebtoken');


// SignUp Page
exports.adminsignup = async function (req, res, next) {
    try {
        let formdata = req.body
        formdata.password = await bcrypt.hash(formdata.password, 8)
        let admindata = await ADMIN.create(formdata)

        res.status(201).json({
            status: "success",
            message: "admin signup successfully",
            data: admindata
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// Login Page
exports.adminlogin = async function (req, res, next) {
    try {
        let formdata = req.body
        let adminemail = await ADMIN.findOne({ email: formdata.email })
        if (!adminemail) {
            throw new Error("admin not found")
        }
        let passComp = await bcrypt.compare(formdata.password, adminemail.password)
        if (!passComp) {
            throw new Error("Invalid Password")
        }

        res.status(201).json({
            status: "success",
            message: "admin signup successfully",
            data: adminemail
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// ... / Page
exports.adminfind = async function (req, res, next) {
    try {
        let data = await ADMIN.find()
        res.status(201).json({
            status: "success",
            message: "admin all data successfully",
            data
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// Delete 
exports.admindelete = async function (req, res, next) {
    try {
        let admindelete = await ADMIN.findByIdAndDelete(req.params.deleteId)
        res.status(201).json({
            status: "success",
            message: "admin delete successfully",
            data: admindelete
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// Update
exports.adminupdate = async function (req, res, next) {
    try {
        let adminupdate = await ADMIN.findByIdAndUpdate(req.params.updateId, req.body)
        res.status(201).json({
            status: "success",
            message: "admin update data successfully",
            data: adminupdate
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

