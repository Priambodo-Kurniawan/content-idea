const router = require("express").Router();
const TrendController = require("../controllers/TrendController");
const { authenticationCustomer } = require("../middlewares/auth");

router.get("/", TrendController.getTrend);

module.exports = router;
