const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize, Sequelize) => {
  //first argument represents the table name
  const Appointment = sequelize.define("Appointment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
  });

  return Appointment;
};