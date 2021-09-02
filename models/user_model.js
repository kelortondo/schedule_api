const { DataTypes } = require("sequelize"); // Import the built-in data types
const Role = require("./role_model.js");

module.exports = (sequelize, Sequelize) => {
  //first argument represents the table name
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
      primaryKey: true
    }
  });
  return User;
};