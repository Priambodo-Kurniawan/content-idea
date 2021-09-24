const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { password, email, username } = req.body;

      const data = { password, email, username };
      const createdUser = await User.create(data);

      res.status(201).json({ id: createdUser.id, email: createdUser.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { password, email } = req.body;

      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "NotFound" };
      }
      const isMatch = await checkPassword(password, user.password);

      if (!isMatch) {
        throw { name: "NotAuthorize" };
      }

      let token = generateToken({ id: user.id, email: user.email });
      res.status(200).json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
