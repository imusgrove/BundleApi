//get all users
var express = require('express')
var router = express.Router()
var User = require('../services/userServices');

router.get("/user", function(req, res) {
    
    User
    .getAll()
    .then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err){
            res.send(500, err.message);
        }
    );
})

//edit user
router.put(`/api/userEdit/:id`, function(req, res) {
    var data = req.params.id;
    
    User.editJob(req, data)

        .then(
            function updateSuccess(user) {
                res.json({
                    user: user
                });            
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});

//create user
router.post('/api/createuser', function (req, res) {

    User.createUser(req)
    .then(
        function createSuccess(user) {
            res.json({
                user: user
            });            
        },
        function createError(err){
            res.send(500, err.message);
        }
    )
})

//get one user
router.get(`/api/getUser/:id`, function(req, res) {
    var id = req.params.id;

    User.getOneUser(req, id)
        .then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

//delete user
router.delete(`/api/deleteUser/:id`, function(req, res) {
    var id = req.params.id;

    User.deleteUser(req, id)
        .then(
            function deleteSuccess(data) {
                res.send("User successfully deleted");
            },
            function deleteError(err){
                res.send(500, err.message);
            }
        )
})

module.exports = router;