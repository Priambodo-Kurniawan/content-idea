const router = require("express").Router();
const SearchController = require("../controllers/SearchController");

router.get("/", SearchController.search);
router.get("/v2", SearchController.searchV2);

module.exports = router;
