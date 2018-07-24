var express = require('express')
var router = express.Router()
var Donor = require('../services/donorServices');

router.get("/donor", function (req, res) {

    Donor
    .getAll()
    .then(
      function findAllSuccess(data) {
          res.json(data);
      },
      function findAllError(err) {
          res.send(500, err.message);
      }
  );
  })
router.post('/api/createdonor', function (req, res) {

    Donor.createDonor(req)
    .then(
        function createSuccess(job) {
            res.json({
                donor: donor
            });            
        },
        function createError(err){
            res.send(500, err.message);
        }
    )
})

router.put(`/api/donorEdit/:id`, function(req, res) {
        var data = req.params.id;
        
        Donor.editDonor(req, data)

            .then(
                function updateSuccess(job) {
                    res.json({
                        donor: donor
                    });            
                },
                function updateError(err){
                    res.send(500, err.message);
                }
            )
    });

router.get(`/api/getDonor/:id`, function(req, res) {
        var id = req.params.id;

        Donor.getOneDonor(req, id)
            .then(
                function findOneSuccess(data) {
                    res.json(data);
                },
                function findOneError(err) {
                    res.send(500, err.message);
                }
            );
    });

router.delete(`/api/deleteDonor/:id`, function(req, res) {
    var id = req.params.id;

    Donor.deleteDonor(req, id)
        .then(
            function deleteSuccess(data) {
                res.send("Donor successfully deleted");
            },
            function deleteError(err){
                res.send(500, err.message);
            }
        )
})

module.exports = router;