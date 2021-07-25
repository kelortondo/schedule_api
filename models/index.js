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
db.template = require("../models/template_model.js")(sequelize, Sequelize);
db.schedule = require("../models/schedule_model.js")(sequelize, Sequelize);
db.appointment = require("../models/appointment_model.js")(sequelize, Sequelize);

//Set relations between tables

//Each user has a role
db.user.belongsTo(db.role, {
  foreignKey: {
    name: 'role_id',
    defaultValue: 1
  }
});

//Each day in the schedule has a template
db.schedule.belongsTo(db.template, {
  foreignKey: {
    name: 'template_id',
    allowNull: false
  }
});

//Each appointment has one client
db.appointment.belongsTo(db.user, {
  foreignKey: {
    name: 'client',
    allowNull: false
  }
});

//Each appointment has one provider
db.appointment.belongsTo(db.user, {
  foreignKey: {
    name: 'provider',
    allowNull: false
  }
});

//Each appointment has one appointment type
db.appointment.belongsTo(db.appointment_type, {
  foreignKey: {
    name: 'apt_type',
    allowNull: false
  }
})

//Set the initial value of an appointment's duration to the duration of it's apt type
db.appointment.beforeValidate(async (apt) => {
  await db.appointment_type.findAll({
    attributes: ['duration'],
    where: {
      id: apt.AppointmentTypeId
    }
  })
  .then((dur) => {
    apt.duration = dur[0].dataValues.duration
  })
});

module.exports = db;