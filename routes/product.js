const router = require("express").Router();
const ProductController = require("../controllers/ProductController");
const Auth = require("../middlewares/auth");

router.use(Auth.authAdmin);
router.get("/", ProductController.getAll);

module.exports = router;
