const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

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
