var sequelize = require('../db');
const donor = sequelize.import('../models/donors');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//get all donors
exports.getAll = function() {
    return donor.findAll()
}

//get one donor
exports.getOneDonor = function(req, id) {
    return donor.findOne({
        where: {
            id:req.params.id
        }
    })
    .then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    );
}

//create donors
exports.createDonor = function(req,res){
    var donor_username = req.body.donor_username;
    var donor_password = req.body.donor_password;
    var donor_email = req.body.donor_email;
    var donor_address = req.body.donor_address;
    var donor_city = req.body.donor_city;
    var donor_state = req.body.donor_state;
    var donor_zipCode = req.body.donor_zipCode;
    var donor_phoneNumber = req.body.donor_phoneNumber;
    var donor_contactName = req.body.donor_contactName;
    return donor
    .create({
        donor_username : donor_username,
        donor_password : bcrypt.hashSync(donor_password, 10),
        donor_email : donor_email,
        donor_address : donor_address,
        donor_city: donor_city,
        donor_state: donor_state,
        donor_zipCode: donor_zipCode,
        donor_phoneNumber: donor_phoneNumber,
        donor_contactName: donor_contactName
    })
    .then(
        function createSuccess(donor) {
          var token = jwt.sign({id: donor.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
          });
          res.json({
            donor: donor,
            message: "created",
            sessionToken: token
          });
        },
        
      )
      .catch (function createError(err) {
        res.status(500).send(err.message);
        console.log((err.message))
      })
    } 

//edit donors
exports.editDonor = function(req, res){
    return donor.update({
        donor_username : req.body.donor_username,
        donor_password : req.body.donor_password,
        donor_email : req.body.donor_email,
        donor_address : req.body.donor_address,
        donor_city: req.body.donor_city,
        donor_state: req.body.donor_state,
        donor_zipCode: req.body.donor_zipCode,
        donor_phoneNumber: req.body.donor_phoneNumber,
        donor_contactName: req.body.donor_contactName
    },
    {where: {id: req.params.id}})
    .then(
        function updateSuccess(donor) {
            
            res.json({
                donor: donor
            });            
        },
        function updateError(err){
            res.send(500, err.message);
        }
    );
}
//delete donors
exports.deleteDonor = function(req ,id){
    return donor.destroy({
        where:{ id:req.params.id}
    })
    .then(
        function deleteSuccess(data) {
            res.send("Donor successfully deleted");
        },
        function deleteError(err){
            res.send(500, err.message);
        }
    );
}
