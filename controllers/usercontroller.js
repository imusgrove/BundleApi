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

//edit user
router.put(`/api/update/:id`, validate, function(req, res) {
    var data = req.params.id;
    User.editUser(req, data)     
});

//create user
router.post('/api/createuser', function (req, res) {
    User.createUser(req,res)
})

//get one user
router.get(`/api/getUser/:id`, validate, function(req, res) {
    var id = req.params.id;
    User.getOneUser(req, id)       
});

//delete user
router.delete(`/api/deleteUser/:id`, validate, function(req, res) {
    var id = req.params.id;
    User.deleteUser(req, id)  
})

module.exports = router;