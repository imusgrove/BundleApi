var express = require('express')
var router = express.Router()
var User = require('../services/userServices');

//get all users
router.get("/user", validate-session, function(req, res) {  
    User
    .getAll()
    
})

//edit user
router.put(`/api/userEdit/:id`, validate-session, function(req, res) {
    var data = req.params.id;
    User.editUser(req, data)     
});

//create user
router.post('/api/createuser', function (req, res) {
    User.createUser(req)
})

//get one user
router.get(`/api/getUser/:id`, validate-session, function(req, res) {
    var id = req.params.id;
    User.getOneUser(req, id)       
});

//delete user
router.delete(`/api/deleteUser/:id`, validate-session, function(req, res) {
    var id = req.params.id;
    User.deleteUser(req, id)  
})

module.exports = router;