const Product = require("../models/product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const response = await Product.find();
    // .select("title price -_id")
    // .populate("userId", "name");
    return res.status(201).json({
      message: "product list ",
      data: response,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const product = new Product({
      title: title,
      price: price,
      imageUrl: imageUrl,
      userId: req.user,
    });
    const result = await product.save();
    return res.status(201).json({
      message: "product list ",
      data: product,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.getByProductId = async (req, res, next) => {
  try {
    const productId = await req.params.productId;
    const result = await Product.findById(productId);
    return res.status(201).json({
      message: "product list ",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.editProduct = async (req, res, next) => {
  try {
    const productId = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.body.id;
    const product = await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
