const db = require("../models");
const config = require("../config/auth_config");
const User = db.user;
const Role = db.role;


//Returns all users and their permissions role
exports.getAllUsers = (req, res, next) => {
  User.findAll({
    attributes: ['username', 'firstName', 'lastName', 'dob', 'phone', 'email', 'uuid'],
    include: {
      model: Role,
      attributes: ['name'],
      required: true
    }
  })
  .then(results => {
    res.status(200).send(results);
    next();
  })
  .catch(err => {
    res.status(500).send(err);
  })
}