const router = require("express").Router();
const ProductController = require("../controllers/ProductController");
const Auth = require("../middlewares/auth");

router.get("/", ProductController.getAll);
router.use(Auth.authAdmin);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);

module.exports = router;
