const express = require("express");

const productController = require("../controllers/product");
const productRouter = express.Router();
const isAuth = require("../middleware/is-auth");

productRouter.get("/", isAuth, productController.getAllProducts);
productRouter.post("/", isAuth, productController.addProduct);
productRouter.delete("/:productId", isAuth, productController.deleteProduct);
productRouter.get("/:productId", isAuth, productController.getByProductId);
productRouter.put("/:productId", isAuth, productController.editProduct);
module.exports = productRouter;
