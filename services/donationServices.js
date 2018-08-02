const express = require("express");
var sequelize = require('../db');
const donation = sequelize.import('../models/donations')

//get all donations
exports.getAll = function(req,res) {
    return donation.findAll()
         .then(donation => res.status(200).json(donation))
    // .then(
    //     function findAllSuccess(data) {
    //         res.json(data);
    //     },
    //     function findAllError(err){
    //         res.send(500, err.message);
    //     }
    // );
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

//create donation
exports.createDonation = function(req, res){

    let used_clothing = req.body.used_clothing;
    let new_clothing = req.body.new_clothing;
    let used_shoes = req.body.used_shoes;
    let new_shoes = req.body.new_shoes;
    let baby_food = req.body.baby_food;
    let diaper_bags = req.body.diaper_bags;
    let bottles = req.body.bottles;
    let pacifiers = req.body.pacifiers;
    let diapers_boxes = req.body.diapers_boxes;
    let beds = req.body.beds;
    let misc_items = req.body.misc_items

    return donation.create({
        used_clothing : used_clothing,
        new_clothing : new_clothing,
        used_shoes : used_shoes,
        new_shoes : new_shoes,
        baby_food:baby_food,
        diaper_bags:diaper_bags,
        bottles:bottles,
        pacifiers:pacifiers,
        diapers_boxes:diapers_boxes,
        beds:beds,
        misc_items:misc_items
    })
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