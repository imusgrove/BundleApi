var sequelize = require("../db");
const donor = sequelize.import("../models/donors");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//login
exports.getOneDonor = function(req, res) {
  var donor_username = req.body.donor.donor_username;
  var donor_password = req.body.donor.donor_password;
  return donor
    .findOne({ where: { donor_username: donor_username } })
    .then(
      function(donor) {
        if (donor) {
          bcrypt.compare(donor_password, donor.donor_password,
            function(err, matches) {
              if (matches) {
                var token = jwt.sign({ id: donor.id }, process.env.JWT_SECRET, {
                  expiresIn: 60 * 60 * 24
                });
                res.json({
                  donor: donor,
                  message: "successfully authenticated",
                  sessionToken: token
                });
              } else {
                res.status(502).send({ error: "Authentication failure" });
              }
            }
          );
        } else {
          res.status(500).send({ error: "failed to authenticate" });
        }
      },
      function(err) {
        res.status(501).send({ error: "Authentication failure" });
      }
    );
};

//get all donors
exports.getAll = function() {
  return donor.findAll();
};

//create donors
exports.createDonor = function(req, res) {
  var donor_fname = req.body.donor_fname;
  var donor_lname = req.body.donor_lname;
  var donor_username = req.body.donor_username;
  var donor_password = req.body.donor_password;
  var donor_email = req.body.donor_email;
  var donor_address = req.body.donor_address;
  var donor_city = req.body.donor_city;
  var donor_state = req.body.donor_state;
  var donor_zipCode = req.body.donor_zipCode;
  var donor_phoneNumber = req.body.donor_phoneNumber;
  return donor
    .create({
      donor_fname: donor_fname,
      donor_lname: donor_lname,
      donor_username: donor_username,
      donor_password: bcrypt.hashSync(donor_password, 10),
      donor_email: donor_email,
      donor_address: donor_address,
      donor_city: donor_city,
      donor_state: donor_state,
      donor_zipCode: donor_zipCode,
      donor_phoneNumber: donor_phoneNumber,
    })
    .then(function createSuccess(donor) {
      var token = jwt.sign({ id: donor.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });
      res.json({
        donor: donor,
        message: "created",
        sessionToken: token
      });
    })
    .catch(function createError(err) {
      res.status(500).send(err.message);
      console.log(err.message);
    });
    //nodemailer notification
    transporter.sendMail(mailOptions, function(error, info){
      if(error) {
          alert(error);
      }else{
          alert('Email sent' + info.response);
      }
  });
  next();
};

//get one donor
exports.getDonor = (id) => {
  return donor
    .findOne({
      where:{id: id}
    })
}

//edit donors
exports.editDonor = function(req, id) {
  return donor
    .update(
      {
        donor_fname: req.body.donor.donor_fname,
        donor_lname: req.body.donor.donor_lname,
        donor_username: req.body.donor.donor_username,
        donor_email: req.body.donor.donor_email,
        donor_address: req.body.donor.donor_address,
        donor_city: req.body.donor.donor_city,
        donor_state: req.body.donor.donor_state,
        donor_zipCode: req.body.donor.donor_zipCode,
        donor_phoneNumber: req.body.donor.donor_phoneNumber,
      },
      { where: { id: id } }
    )
};

//delete donors
exports.deleteDonor = function(id) {
  return donor
    .destroy({
      where: { id: id }
    })
    
};
