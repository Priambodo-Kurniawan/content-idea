const googleTrends = require("google-trends-api");

class ApiController {
  static async getTrend(req, res, next) {
    try {
      var d = new Date();
      let keyword = req.query.keyword || "news";
      d.setDate(d.getDate() - 30 * 12);
      let trends = await googleTrends.relatedTopics({
        keyword: keyword,
        geo: "ID",
        startTime: d,
      });

      console.log(trends);
      res.send({ hello: "ok", trends: JSON.parse(trends) });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = ApiController;
