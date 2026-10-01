const express = require("express");
const shopController = require("../controllers/shop");
const router = express.Router();

router.get("/cart", shopController.productCart);
router.post("/cart", shopController.postCart);
router.delete("/cart", shopController.deleteCart);
router.post("/orders", shopController.postOrder);
router.get("/orders", shopController.getOrder);
module.exports = router;
