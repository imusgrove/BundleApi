var express = require('express')
var router = express.Router()
var User = require('../services/userServices');
var validate = require('../middleware/headers');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//login user
router.post('/login', validate, function(req, res){
    User.getOneUser(req,res)
});

//create user
router.post('/createuser', function (req, res) {
    User.createUser(req,res)
})

//edit user
router.put('/update/:id', validate, function(req, res) {
    User.editUser(req, res)     
});


//delete user
router.delete('/delete/:id', validate, function(req, res) {
    User.deleteUser(req, res)  
})

module.exports = router;