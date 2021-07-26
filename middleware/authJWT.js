const jwt = require("jsonwebtoken");
const config = require("../config/auth_config.js");
const db = require("../models");
const User = db.user;

//Verifies that a token is valid
exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorzied request"
      });
    } else {
      next();
    }
  });
};


//Verifies that a user is an administrator
exports.isAdmin = (req, res, next) => {
  User.findByPk(req.body.uuid).then(user => {
    if (user.role_id === 2) {
      next();
      return;
    } else {
      return res.status(403).send({
        message: "Administrator role required"
      });
    }
  });
}

//Verifies that a user is either an adiministrator or an employee
exports.isEmployeeOrAdmin = (req, res, next) => {
  User.findByPk(req.body.uuid).then(user => {
    if (user.role_id === 3 || user.role_id == 2) {
      next();
      return;
    } else {
      return res.status(403).send({
        message: "Employee or admin role required"
      });
    }
  });
}

//Verifies that a user is a client
exports.isClient = (req, res, next) => {
  User.findByPk(req.body.uuid).then(user => {
    if (user.role_id === 1) {
      next();
      return;
    } else {
      return res.status(403).send({
        message: "Client role required"
      });
    }
  });
}