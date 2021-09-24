const router = require("express").Router();
const userRoute = require("./user");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "app is running" });
});
router.use("/", userRoute);

module.exports = router;
