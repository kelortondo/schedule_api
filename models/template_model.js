const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize, Sequelize) => {
  //first argument represents the table name
  const Template = sequelize.define("Template", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    template: {
      type: DataTypes.JSONB
    }
  });

  return Template;
};