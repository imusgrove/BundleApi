var express = require('express')
var router = express.Router()
var Donor = require('../services/donorServices');

//get all donors
router.get("/donor", validate-session, function (req, res) {
    Donor
    .getAll()
  })

  //create donor
router.post('/api/createdonor', function (req, res) {
    Donor.createDonor(req)
})

//edit donor
router.put(`/api/donorEdit/:id`, validate-session, function(req, res) {
        var data = req.params.id;
        Donor.editDonor(req, data)     
    });

//get one donor
router.get(`/api/getDonor/:id`, validate-session, function(req, res) {
        var id = req.params.id;
        Donor.getOneDonor(req, id)
            
    });

//delete donor
router.delete(`/api/deleteDonor/:id`, validate-session, function(req, res) {
    var id = req.params.id;
    Donor.deleteDonor(req, id)
})

module.exports = router;