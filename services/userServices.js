var sequelize = require("../db");
const user = sequelize.import("../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



//login
exports.getOneUser= function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  return user
  .findOne({ where: { username: req.body.username}}).then(
    function(user) {
      if (user) {
        bcrypt.compare(req.body.password, user.passwordhash, function(
          err,
          matches
        ) {
          if (matches) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              user: user,
              message: "successfully authenticated",
              sessionToken: token
            });
          } else {
            res.status(502).send({ error: "You failed, yo" });
          }
        });
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    function(err) {
      res.status(501).send({ error: "you failed, yo" });
    }
  );
}



// //get one user
// exports.getOneUser = function(req, id) {
//   return user
//     .findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//     .then(
//       function findOneSuccess(user) {
//         res.json(user);
//       },
//       function findOneError(err) {
//         res.send(500, err.message);
//       }
//     );
// };

//create user
exports.createUser = function(req, res) {
    var username = req.body.users.username;
    var password = req.body.users.password;
    var email = req.body.users.email;
  return user
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
exports.editUser = function(req, res) {
  var data = req.params.id;
  var username = req.body.users.username;
  var password = req.body.users.password;
  var email = req.body.users.email;
  return user
    .update(
      {
        username: req.body.users.username,
        password: req.body.users.password,
        email: req.body.users.email
      },
      { where: { id:data} }
    )
    .then(
      function updateSuccess(user) {
        res.json({
          user: user
        });
      },
      function updateError(err) {
        res(500).send(err.message);
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

