const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize, Sequelize) => {
  //first argument represents the table name
  const Schedule = sequelize.define("Schedule", {
    date: {
      type: DataTypes.DATE,
      primaryKey: true,
      unique: true
    }
  });

  return Schedule;
};