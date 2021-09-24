"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Product name cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "Product name is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["active", "inactive"]],
        },
        defaultValue: "active",
      },
      config: {
        type: DataTypes.JSONB,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
