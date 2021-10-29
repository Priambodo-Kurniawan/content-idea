const { Order } = require("../models");
const axios = require("axios");
const add = require("date-fns/add");
const format = require("date-fns/format");
const isAfter = require("date-fns/isAfter");
const transformConfig = require("../helpers/transformConfig");

class ApiController {
  static async getIdeaContent(req, res, next) {
    try {
      let apiKey = req.headers.api_key;
      let limit = req.limit;
      let config = req.config;
      let feature = req.params.feature;
      let nextMonth = add(new Date(req.subscriptionDate), { months: 1 });
      let isAfterDate = isAfter(add(new Date(), { days: 1 }), nextMonth);
      let subscriptionDate = req.subscriptionDate;

      if (isAfterDate) {
        subscriptionDate = nextMonth;
        for (const key in limit) {
          // default
          limit[key] = config[key].quota;
        }
      }

      if (!limit[feature] && limit[feature] !== 0) {
        limit[feature] = config[feature].quota; // default
      }

      if (limit[feature] <= 0) {
        // limit[feature] = 10;
        throw {
          name: "BadRequest",
          msg: "Ops... you hit the limit for this month",
        };
      }

      // set request options
      if (config[feature].hasOwnProperty("config")) {
        config = transformConfig(config, feature, req.query);
      }

      const result = await axios({
        url: config[feature].url,
        method: config[feature].method,
        params: req.query,
        data: config[feature].data,
        headers: config[feature].headers,
      });
      if (!result.data)
        throw { name: "BadRequest", msg: "Ops something error" };

      if (result.data.hasOwnProperty("success")) {
        if (result.data.success) {
          limit[feature] = limit[feature] - 1;
        }
      } else {
        limit[feature] = limit[feature] - 1;
        // limit[feature] = 5;
      }

      const updatedData = await Order.update(
        { limit, subscriptionDate },
        {
          where: { apiKey },
          returning: true,
          plain: true,
        }
      );

      res.status(200).json({
        msg: "ok",
        result: result.data,
        data: {
          limit: updatedData[1].limit,
          nextMonth: format(new Date(nextMonth), "MM/dd/yyyy"),
          subscriptionDate: format(
            new Date(req.subscriptionDate),
            "MM/dd/yyyy"
          ),
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ApiController;
