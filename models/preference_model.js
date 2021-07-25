const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize, Sequelize) => {
  //first argument represents the table name
  const Preference = sequelize.define("Preference", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  return Preference;
};