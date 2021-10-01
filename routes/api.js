const router = require("express").Router();
const ApiController = require("../controllers/ApiController");
const { authApi } = require("../middlewares/auth");

router.use(authApi);
router.get("/:feature", ApiController.getIdeaContent);

module.exports = router;
