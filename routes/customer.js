const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const { authenticationCustomer } = require("../middlewares/auth");

router.post("/claim", authenticationCustomer, OrderController.claim);
router.get("/getProduct", authenticationCustomer, OrderController.getProduct);

module.exports = router;
