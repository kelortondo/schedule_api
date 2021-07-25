const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize, Sequelize) => {
  //first argument represents the table name
  const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  });

  return Role;
};