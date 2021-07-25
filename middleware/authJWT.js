const jwt = require("jsonwebtoken");
const config = require("../config/auth_config.js");
const db = require("../models");
const User = db.user;

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
      req.userId = decoded.id;
      next();
    }
  });
};

exports.isAdmin = (req, res, next) => {
  User.findByPk(req.uuid).then(user => {
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

exports.isEmployeeOrAdmin = (req, res, next) => {
  User.findByPk(req.uuid).then(user => {
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

exports.isClient = (req, res, next) => {
  User.findByPk(req.uuid).then(user => {
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