const express = require("express");
var sequelize = require('../db');
const donation = sequelize.import('../models/donations');
const sendEmail = require('../sendEmail')

//get all donations
exports.getAll = function(req,res) {
    return donation.findAll()
    .then(
        function createSuccess(donation) {
            sendEmail({
              from: test@gmail.com,
              to: boss@gmail.com,
              subject: req.body.donationOption + ' donation alert'
              text: 'yay donations!\n' + JSON.stringify(donation) // you get the point...
            }).then(function (info) {
              res.json({
                donation: donation
              });
            }).catch(function (err) {
              res.status(500).send(err);
              // or maybe you don't care that the email failed:
              // res.status(200).send({message: 'donation sent, but email didn\'t'});
            }); 
          },
          function createError(err){
            res.send(500, err.message);
          } ;
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
            sendEmail({
              from: "iesha.musgrove@gmail.com",
              to: "iesha.musgrove@gmail.com",
              subject: req.body.donationOption + ' donation alert',
              text: 'yay donations!\n' + JSON.stringify(donation) // you get the point...
            }).then(function (info) {
              res.json({
                donation: donation
              });
            }).catch(function (err) {
              res.status(500).send(err);
              // or maybe you don't care that the email failed:
              // res.status(200).send({message: 'donation sent, but email didn\'t'});
            }); 
          },
          function createError(err){
            res.send(500, err.message);
          },
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

