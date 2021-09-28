const { Product } = require("../models");

class ProductController {
  static async getAll(req, res, next) {
    const products = await Product.findAll({
      attributes: {
        exclude: ["config", "userId"],
      },
    });
    res.status(200).json(products);
  }

  static async create(req, res, next) {
    try {
      const { name, config, quantity, price, description, image } = req.body;

      const data = {
        name,
        config: JSON.parse(config),
        quantity,
        price,
        description,
        image,
        userId: req.user.id,
      };

      const product = await Product.create(data);
      res.status(201).json({
        msg: "successfully create product",
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { name, config, quantity, price, description, image } = req.body;

      const data = {
        name,
        config: JSON.parse(config),
        quantity,
        price,
        description,
        image,
        userId: req.user.id,
      };

      const product = await Product.update(data, {
        where: { id: req.params.id },
        returning: true,
        plain: true,
      });
      res.status(200).json({
        msg: "successfully edit product",
        product: product[1],
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
