var sequelize = require('../db');
const donation = sequelize.import('../models/donations')

exports.getAll = function() {
    return donation.findAll({

    })
}

exports.getOneDonation = function(req, id){
    return donation.findOne({
        where: {
            id:req.params.id
        }
    })
}

exports.createDonation = function(req){
    return donation.create({
        used_clothing : req.body.donation.used_clothing,
        new_clothing : req.body.donation.new_clothing,
        used_shoes : req.body.donation.used_shoes,
        new_shoes : req.body.donation.new_shoes,
        baby_food:req.body.donation.baby_food,
        diaper_bags:req.body.donation.diaper_bags,
        bottles:req.body.donation.bottles,
        pacifiers:req.body.donation.pacifiers,
        diapers_boxes:req.body.donation.diapers_boxes,
        beds:req.body.donation.beds,
        misc_items:req.body.donation.misc_items
    })
}

exports.editDonation = function(req, id){
    return donation.update({
        used_clothing : req.body.donation.used_clothing,
        new_clothing : req.body.donation.new_clothing,
        used_shoes : req.body.donation.used_shoes,
        new_shoes : req.body.donation.new_shoes,
        baby_food:req.body.donation.baby_food,
        diaper_bags:req.body.donation.diaper_bags,
        bottles:req.body.donation.bottles,
        pacifiers:req.body.donation.pacifiers,
        diapers_boxes:req.body.donation.diapers_boxes,
        beds:req.body.donation.beds,
        misc_items:req.body.donation.misc_items
    },
    {where: {id: req.params.id}})
}

exports.deleteDonation = function(req ,id){
    return donation.destroy({
        where:{ id:req.params.id}
    })
}