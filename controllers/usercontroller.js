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
    )
})