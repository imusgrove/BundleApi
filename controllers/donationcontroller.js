var express = require('express')
var router = express.Router()
var Donation = require('../services/donationServices');
var validate = require('../middleware/headers');

//get all donations
router.get("/", function(req, res) {
   Donation.getAll(req,res) 
});

//create donation
router.post('/createdonation', validate, function (req, res) {
    Donation.createDonation(req,res)
   
});

//edit donation
router.put('/editdonation/:id', validate, function(req, res) {
        var data = req.params.id;
        Donation.editDonation(req, res)
    });

//get one donation
router.get('/getdonation/:id', validate, function(req, res) {
        var id = req.params.id;
        Donation.getOneDonation(req, res)      
    });

//delete donation
router.delete('/deletedonation/:id', validate, function(req, res) {
    Donation.deleteDonation(req, res)
    .then(
        function deleteSuccess(donation) {
            res.send("Donation deleted");
        },
        function deleteError(err) {
            res.send(500, err.message);
        }
    );      
});

module.exports = router;