var express = require('express')
var router = express.Router()
var Donor = require('../services/donorServices');
var validate = require('../middleware/headers');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//login user
router.post('/login', validate, function(req, res){
    Donor.getOneDonor(req,res)
});

//get all donors
router.get("/", validate, function (req, res) {
    Donor
    .getAll()
  })

  //create donor
router.post('/createdonor', function (req, res) {
    Donor.createDonor(req, res)
})

//edit donor
router.put('/editdonor/:id', validate, function(req, res) {
        var data = req.params.id;
        Donor.editDonor(req, res)     
    });

//get one donor
router.get('/getdonor/:id', validate, function(req, res) {
        var id = req.params.id;
        Donor.getOneDonor(req, res)      
    });

//delete donor
router.delete('/deletedonor/:id', validate, function(req, res) {
    var id = req.params.id;
    Donor.deleteDonor(req, res)
})

module.exports = router;