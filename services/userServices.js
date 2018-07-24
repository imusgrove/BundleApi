var sequelize = require('../db');
const user = sequelize.import('../models/user')

//get all users
exports.getAll = function() {
    return user.findAll({

    })
}

//get one user
exports.getOneUser = function(req, id){
    return user.findOne({
        where: {
            id:req.params.id
        }
    })
}

//create user
exports.createUser = function(req){
    return user.create({
        username : req.body.user.username,
        password : req.body.user.password,
        email : req.body.user.email,
    })
}

//edit user 
exports.editUser = function(req, id){
    return user.update({
        username : req.body.user.username,
        password : req.body.user.password,
        email : req.body.user.email,
    },
    {where: {id: req.params.id}})
}

exports.deleteUser = function(req ,id){
    return user.destroy({
        where:{ id:req.params.id}
    })
}
