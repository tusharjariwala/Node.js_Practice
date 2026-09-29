const express = require("express");

const productController = require("../controllers/product");
const productRouter = express.Router();
productRouter.get("/", productController.getAllProducts);
productRouter.post("/", productController.addProduct);
productRouter.delete("/:productId", productController.deleteProduct);
productRouter.get("/:productId", productController.getByProductId);
productRouter.put("/:productId", productController.editProduct);
module.exports = productRouter;
