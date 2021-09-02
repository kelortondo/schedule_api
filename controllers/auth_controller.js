const db = require("../models");
const config = require("../config/auth_config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


//Handles user sign up
exports.signUp = (req, res) => {
  User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    phone: req.body.phone,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  .then((user) => {
    res.status(201).send({
      id: user.uuid,
      role: user.role_id,
    })
  })
  .catch((err) => {
    res.status(406).send(err);
  })
};

//Handles user sign in
exports.signIn = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    } else {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.uuid,
        role: user.role_id,
        accessToken: token
      })
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

//Resets a password
exports.resetPassword = (req, res) => {
  User.update(
    { password: bcrypt.hashSync(req.body.newPassword, 8)},
    { where:
      {username: req.body.username }
    }
  )
    .then(result =>
      res.status(200).send("Password successfully updated.")
    )
    .catch(err =>
      res.status(500).send(err)
    )
}

//Change permission role
exports.changeRole = (req, res) => {
  console.log(req.body)
  User.update(
    { role_id: parseInt(req.body.role_id)},
    { where:
      {username: req.body.username }
    }
  )
    .then(result =>
      res.status(200).send("User role successfully updated.")
    )
    .catch(err =>
      res.status(500).send(err)
    )
}