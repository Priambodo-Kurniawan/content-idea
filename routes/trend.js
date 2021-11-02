const router = require("express").Router();
const TrendController = require("../controllers/TrendController");
const { authenticationCustomer } = require("../middlewares/auth");

router.get("/topic", TrendController.getTrend);
router.get("/query", TrendController.getRelatedQueries);
router.get("/daily", TrendController.getDailyTrend);

module.exports = router;
