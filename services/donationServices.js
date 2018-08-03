const express = require("express");
var sequelize = require('../db');
const donation = sequelize.import('../models/donations')

//get all donations
exports.getAll = function(req,res) {
    return donation.findAll()
    .then(
        function findAllSuccess(data) {
            res.json(data.map(datum => datum.toJSON()).map(obj => {
                let customDonor = {id: 0, donationItem: '', donationAmount: 0}
                customDonor.id = obj.id
                delete obj.id
                for(let key in obj) {
                  if(obj[key] > 0) {
                    customDonor.donationItem = key
                    customDonor.donationAmount = obj[key]
                    break;
                  }
                }
                return customDonor
              }));
        },
        function findAllError(err){
            res.send(500, err.message);
        }
    );
}

//get one donation
exports.getOneDonation = function(req, res){
    return donation.findOne({
        where: {
            id:req.params.id
        }
    })
    .then(
        function findOneSuccess(donation) {
            res.json(donation);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    );
}

//req.body.option
//req.body.amount


//create donation
exports.createDonation = function(req, res){

    let newDonation = {
        used_clothing : 0,
        new_clothing : 0,
        used_shoes : 0,
        new_shoes : 0,
        baby_food: 0,
        diaper_bags: 0,
        bottles: 0,
        pacifiers: 0,
        diapers_boxes: 0,
        beds: 0,
        misc_items: 0
    }
    console.log(req.body)
    newDonation[req.body.donationOption] = req.body.donationAmount
    console.log(newDonation)
    return donation.create(newDonation)
    .then(
        function createSuccess(donation) {
            res.json ({
                donation: donation
            });  
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
}

//edit donation
exports.editDonation = function(req, res){
    return donation.update({
        used_clothing : req.body.used_clothing,
        new_clothing : req.body.new_clothing,
        used_shoes : req.body.used_shoes,
        new_shoes : req.body.new_shoes,
        baby_food:req.body.baby_food,
        diaper_bags:req.body.diaper_bags,
        bottles:req.body.bottles,
        pacifiers:req.body.pacifiers,
        diapers_boxes:req.body.diapers_boxes,
        beds:req.body.beds,
        misc_items:req.body.misc_items
    },
    {where: {id: req.params.id}})
    .then(
        function updateSuccess(donation) {
            res.json({
                donation: donation
            });            
        },
        function updateError(err){
            res.send(500, err.message);
        }
    );
}

//delete donation
exports.deleteDonation = function(req ,res){
    return donation.destroy({
        where:{ id:req.params.id}
    })
    .then(
        function deleteSuccess(donation) {
            res.send("Donation successfully deleted");
        },
        function deleteError(err){
            res.send(500, err.message);
        }
    );
}