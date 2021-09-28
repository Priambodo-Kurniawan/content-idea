const { Order, Product, sequelize } = require("../models");

class OrderController {
  static async claim(req, res, next) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { idProduct } = req.body;
        const product = await Product.findByPk(idProduct);
        if (!product) throw { name: "NotFound", msg: "Ups product not found" };

        if (product.quantity <= 0)
          throw { name: "BadRequest", msg: "Ups product not available" };

        const orderedAlready = await Order.findOne({
          where: {
            userId: req.user.id,
            productId: idProduct,
          },
        });
        if (orderedAlready)
          throw {
            name: "BadRequest",
            msg: "Ups, you already had this product",
          };

        const data = {
          subscriptionDate: new Date(),
          userId: req.user.id,
          productId: idProduct,
        };

        const orderData = await Order.create(data, {
          individualHooks: true,
          configData: product.config,
          transaction: t,
        });

        await Product.update(
          {
            quantity: product.quantity - 1,
          },
          {
            where: { id: idProduct },
            transaction: t,
          }
        );

        return orderData;
      });

      res.status(201).json({
        msg: "successfully claim product",
        data: result,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = OrderController;
