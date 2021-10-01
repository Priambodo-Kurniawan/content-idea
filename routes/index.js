const router = require("express").Router();
const userRoute = require("./user");
const productRoute = require("./product");
const customerRoute = require("./customer");
const apiRoute = require("./api");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "app is running" });
});
router.use("/", userRoute);
router.use("/product", productRoute);
router.use("/customer", customerRoute);
router.use("/api", apiRoute);

module.exports = router;
