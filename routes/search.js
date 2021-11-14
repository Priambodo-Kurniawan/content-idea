const router = require("express").Router();
const SearchController = require("../controllers/SearchController");

router.get("/", SearchController.search);

module.exports = router;
