var sequelize = require("../db");
const user = sequelize.import("../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//get all users
exports.getAll = function() {
  return user.findAll().then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
};

//get one user
exports.getOneUser = function(req, id) {
  return user
    .findOne({
      where: {
        id: req.params.id
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
};

//create user
exports.createUser = function(req, res) {
    var username = req.body.users.username;
    var password = req.body.users.password;
    var email = req.body.users.email;
  return users
    .create({
      username: username,
      passwordhash: bcrypt.hashSync(password, 10),
      email: email
    })
    .then(
        function createSuccess(user) {
          var token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
          });
    
          res.json({
            user: user,
            message: "created",
            sessionToken: token
          });
        },
        function createError(err) {
          res.send(500, err.message);
        }
      );
    } 

//edit user
exports.editUser = function(req, id) {
  return user
    .update(
      {
        username: req.body.user.username,
        password: req.body.user.password,
        email: req.body.user.email
      },
      { where: { id: req.params.id } }
    )
    .then(
      function updateSuccess(user) {
        res.json({
          user: user
        });
      },
      function updateError(err) {
        res.send(500, err.message);
      }
    );
};

exports.deleteUser = function(req, id) {
  return user
    .destroy({
      where: { id: req.params.id }
    })
    .then(
      function deleteSuccess(data) {
        res.send("User successfully deleted");
      },
      function deleteError(err) {
        res.send(500, err.message);
      }
    );
};
