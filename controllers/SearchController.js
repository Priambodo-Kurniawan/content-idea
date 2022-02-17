const googleIt = require("google-it-safesearch");
const wtj = require("website-to-json");

class ApiController {
  static async search(req, res, next) {
    try {
      let query = req.query.q;
      const data = await googleIt({
        query: query,
        disableConsole: true,
      });
      res.send({ data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async searchV2(req, res, next) {
    try {
      let q = req.query.q;
      if (!q) {
        throw {
          name: "BadRequest",
          msg: "Ops... please input q (query)",
        };
      }

      let response = await wtj.extractData(
        "https://www.google.com/search?q=" + q,
        {
          fields: ["data"],
          parse: function ($) {
            let content = $("a > h3")
              .map(function (val) {
                let link = $(this)
                  .parent()
                  .attr("href")
                  .split("q=")[1]
                  .split("&sa")[0];
                let content = $(this).parent().parent().next().text();
                return {
                  title: $(this).text(),
                  link: link,
                  content,
                };
              })
              .get();
            return {
              content,
            };
          },
        }
      );

      res.status(200).json({
        response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = ApiController;
