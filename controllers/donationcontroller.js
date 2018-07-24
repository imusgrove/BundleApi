var express = require('express')
var router = express.Router()
var Donation = require('../services/donationServices');

router.get("/donation", function(req, res) {
    
    Donation
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
router.post('/api/createdonation', function (req, res) {

    Donation.createDonation(req)
    .then(
        function createSuccess(donation) {
            res.json({
                donation: donation
            });            
        },
        function createError(err){
            res.send(500, err.message);
        }
    )
})

router.put(`/api/donationEdit/:id`, function(req, res) {
        var data = req.params.id;
        
        Donation.editDonation(req, data)

            .then(
                function updateSuccess(donation) {
                    res.json({
                        donation: donation
                    });            
                },
                function updateError(err){
                    res.send(500, err.message);
                }
            )
    });

router.get(`/api/getDonation/:id`, function(req, res) {
        var id = req.params.id;

        Job.getOneDonation(req, id)
            .then(
                function findOneSuccess(data) {
                    res.json(data);
                },
                function findOneError(err) {
                    res.send(500, err.message);
                }
            );
    });

router.delete(`/api/deleteDonation/:id`, function(req, res) {
    var id = req.params.id;

    Job.deleteDonation(req, id)
        .then(
            function deleteSuccess(data) {
                res.send("Donation successfully deleted");
            },
            function deleteError(err){
                res.send(500, err.message);
            }
        )
})

module.exports = router;