var express = require('express')
var router = express.Router()
var Donation = require('../services/donationServices');
var validate = require('../middleware/headers');
const nodemailer = require('nodemailer');


//get all donations
router.get("/", function(req, res) {
   Donation.getAll(req,res) 
});

//create donation
router.post('/createdonation', validate, function (req, res) {
    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("The donation was sent!");
        console.log(info);
      });
});

//edit donation
router.put('/editdonation', validate, function(req, res) {
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
    // .then(
    //     function deleteSuccess(donation) {
    //         res.send("Donation deleted");
    //     },
    //     function deleteError(err) {
    //         res.send(500, err.message);
    //     }
    // );      
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
  //   make true if using ssl certificate
    secure: false,
  //   stmp port
    port: 25,
    auth: {
      user: 'iesha.musgrove@gmail.com',
      pass: 'Victory3395'
    },
  //   protocol
    tls: {
      rejectUnauthorized: false
    }
  });
  // use to construct body of email
  let HelperOptions = {
    from: '"Iesha" <iesha.musgrove@gmail.com',
    to: 'iesha.musgrove@gmail.com',
    subject: 'New Donation',
    text: 'You have a new donation'
  };
  
  // contains callback data
    // transporter.sendMail(HelperOptions, (error, info) => {
    //   if (error) {
    //     return console.log(error);
    //   }
    //   console.log("The message was sent!");
    //   console.log(info);
    // });

module.exports = router;