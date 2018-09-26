var express = require('express')
var router = express.Router()
var Donor = require('../services/donorServices');
var validate = require('../middleware/headers');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var transporter = require('../transport')

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
router.post('/createdonor', function (req, res, next) {
    Donor.createDonor(req, res, next)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'iesha.musgrove@gmail.com',
            pass: 'Victory!3395'
        }
        
    })
    const mailOptions = {
        from: `${req.body.donor_email}`,
        to: 'test-email@gmail.com',
        subject: `${req.body.donor_fname}`,
        text: `${req.body.message}`,
        replyTo: `${req.body.donor_email}`
    }
    transporter.sendMail(mailOptions, function(err, res){
        if(err){
            console.error('there was an error: ', err);
        }else{
            console.log('here is teh res: ', res)
        }
    })
})





//edit donor
router.put('/editdonor/:id', validate, function(req, res) {
        Donor.editDonor(req, req.params.id)
        .then(
            function updateSuccess(donor) {
              res.json({
                  donor: donor
              });
            },
            function updateError(err) {
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