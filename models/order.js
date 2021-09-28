"use strict";
const { Model } = require("sequelize");
const { generateToken } = require("../helpers/jwt");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      apiKey: DataTypes.TEXT,
      subscriptionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "subscription date is required",
          },
          notEmpty: {
            args: true,
            msg: "subscription date is required",
          },
        },
        defaultValue: "active",
      },
      subscriptionType: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["free", "monthly", "yearly"]],
        },
        defaultValue: "free",
      },
      paymentStatus: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["pending", "success", "failed"]],
        },
        defaultValue: "pending",
      },
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      limit: {
        type: DataTypes.JSONB,
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate(order, option) {
          let obj = {};
          for (const i in option.configData) {
            obj[i] = option.configData[i].quota;
          }
          order.limit = obj;
          order.apiKey = generateToken(option.configData);
        },
      },
      modelName: "Order",
    }
  );
  return Order;
};
