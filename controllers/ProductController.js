const { Product } = require("../models");

class ProductController {
  static async getAll(req, res, next) {
    const products = await Product.findAll();
    res.status(200).json(products);
  }
}

module.exports = ProductController;
