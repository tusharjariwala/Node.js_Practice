const express = require("express");
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/cart", isAuth, shopController.productCart);
router.post("/cart", isAuth, shopController.postCart);
router.delete("/cart", isAuth, shopController.deleteCart);
router.post("/orders", isAuth, shopController.postOrder);
router.get("/orders", isAuth, shopController.getOrder);
module.exports = router;
