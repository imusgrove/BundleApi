var express = require('express')
var router = express.Router()
var Donor = require('../services/donorServices');
var validate = require('../middleware/headers');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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
router.get(`/api/getDonor/:id`, validate, function(req, res) {
        var id = req.params.id;
        Donor.getOneDonor(req, id)
            
    });

//delete donor
router.delete(`/api/deleteDonor/:id`, validate, function(req, res) {
    var id = req.params.id;
    Donor.deleteDonor(req, id)
})

module.exports = router;