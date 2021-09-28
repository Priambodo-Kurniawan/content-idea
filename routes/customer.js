const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const { authenticationCustomer } = require("../middlewares/auth");

router.post("/claim", authenticationCustomer, OrderController.claim);

module.exports = router;
