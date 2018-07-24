var sequelize = require('../db');
const Donor = sequelize.import('../models/donors')

//get all donors
exports.getAll = function() {
    return donor.findAll()
}
//get one donor
exports.getOneDonor = function(req, id){
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
exports.createDonor = function(req){
    return donor.create({
        donor_username : req.body.donor.donor_username,
        donor_password : req.body.donor.donor_password,
        donor_email : req.body.donor.donor_email,
        donor_address : req.body.donor.donor_address,
        donor_city: req.body.donor.donor_city,
        donor_zipCode: req.body.donor.donor_zipCode,
        donor_phoneNumber: req.body.donor.donor_phoneNumber,
        donor_contactName: req.body.donor.donor_contactName
    })
    .then(
        function createSuccess(job) {
            res.json({
                donor: donor
            });            
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
}
//edit donors
exports.editDonor = function(req, id){
    return donor.update({
        donor_username : req.body.donor.donor_username,
        donor_password : req.body.donor.donor_password,
        donor_email : req.body.donor.donor_email,
        donor_address : req.body.donor.donor_address,
        donor_city: req.body.donor.donor_city,
        donor_zipCode: req.body.donor.donor_zipCode,
        donor_phoneNumber: req.body.donor.donor_phoneNumber,
        donor_contactName: req.body.donor.donor_contactName
    },
    {where: {id: req.params.id}})
    .then(
        function updateSuccess(job) {
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