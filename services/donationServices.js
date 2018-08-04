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

    newDonation[req.body.donationOption] = req.body.donationAmount

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

//  req.body = {
//      id: number,
//      donationAmount: number,
//      donationItem: string
//  }

//edit donation
exports.editDonation = function(req,res){
    let editedDonation = {
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
    editedDonation[req.body.donationItem] = req.body.donationAmount

    return donation.update(editedDonation, {where: {id: req.body.id}})
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
    console.log(req.params)
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