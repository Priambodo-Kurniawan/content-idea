"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Email cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
          isEmail: {
            args: true,
            msg: "Email is invalid",
          },
        },
        unique: {
          args: true,
          msg: "Email is already exists",
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Username cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "Username is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password);
        },
      },
      modelName: "User",
    }
  );
  return User;
};
