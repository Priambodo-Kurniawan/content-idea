const googleIt = require("google-it-safesearch");

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
}
module.exports = ApiController;
