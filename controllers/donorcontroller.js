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
        Donor.editDonor(req, data)
        .then(
            function editSuccess(donor) {
              res.send("Donor successfully edited");
            },
            function editError(err) {
              res.send(500, err.message);
            }
          );     
    });

//get one donor
router.get('/getdonor/:id', validate, function(req, res) {
        Donor.getDonor(req.params.id)
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message)
            }
        )      
    });

//delete donor
router.delete('/deletedonor/:id', validate, function(req, res) {
    Donor.deleteDonor(req.params.id)
    .then(
        function deleteSuccess(donor) {
          res.send("Donor successfully deleted");
        },
        function deleteError(err) {
          res.send(500, err.message);
        }
      );
})

module.exports = router;