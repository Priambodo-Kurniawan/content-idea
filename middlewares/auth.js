const { verifyToken } = require("../helpers/jwt");
const { User, Order, Product } = require("../models");

class Auth {
  static async authenticationCustomer(req, res, next) {
    try {
      let token = req.headers.token;
      if (!token) throw { name: "NotAuthorize" };

      let decoded = verifyToken(token);
      let user = await User.findByPk(decoded.id);
      if (!user) throw { name: "NotAuthorize" };
      if (user.role !== "customer") throw { name: "Forbiden" };

      req.user = {
        id: user.id,
        email: user.email,
      };
      next();
    } catch (error) {
      next(error);
    }
  }

  static async authApi(req, res, next) {
    try {
      let apiKey = req.headers.api_key;
      if (!apiKey) throw { name: "BadRequest", msg: "api key is required" };

      let orderDetail = await Order.findOne({
        where: {
          apiKey,
        },
        include: {
          model: Product,
          as: "product",
        },
      });

      if (!orderDetail) throw { name: "NotFound", msg: "api key is wrong" };
      await verifyToken(apiKey);
      req.config = orderDetail.product.config;
      req.limit = orderDetail.limit;
      req.subscriptionDate = orderDetail.subscriptionDate;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async authAdmin(req, res, next) {
    try {
      let token = req.headers.token;
      if (!token) throw { name: "NotAuthorize" };

      let decoded = verifyToken(token);
      let user = await User.findByPk(decoded.id);
      if (!user) throw { name: "NotAuthorize" };
      if (user.role !== "admin") throw { name: "Forbiden" };

      req.user = {
        id: user.id,
        email: user.email,
      };
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Auth;
