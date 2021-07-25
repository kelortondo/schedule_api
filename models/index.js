const config = require("../config/db_config.js");
const { Client } = require('pg');

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorAliases: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("../models/role_model.js")(sequelize, Sequelize);
db.user = require("../models/user_model.js")(sequelize, Sequelize);
db.preference = require("../models/preference_model.js")(sequelize, Sequelize);
db.appointment_type = require("../models/appointment_type_model.js")(sequelize, Sequelize);

//Set relations between tables
db.user.belongsTo(db.role)

module.exports = db;