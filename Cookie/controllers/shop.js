const order = require("../models/order");
const Order = require("../models/order");
const Product = require("../models/product");

exports.productCart = async (req, res, next) => {
  try {
    await req.user.populate("cart.items.productId");
    return res.status(200).json({
      data: req.user.cart.items,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const updateCarts = await req.user.removeFromCart(productId);
    return res.status(200).json({
      updateCarts,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    await req.user.populate("cart.items.productId");
    const products = req.user.cart.items.map((e) => {
      return {
        quantity: e.quantity,
        product: { ...e.productId._doc },
      };
    });
    const order = new Order({
      products: products,
      user: {
        email: req.user.email,
        userId: req.user,
      },
    });
    await order.save();
    await req.user.clearCart();
    return res.status(200).json({
      message: "Order update succefully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const response = await order.find({ "user.userId": req.user._id });
    return res.status(200).json({
      message: "Order update succefully",
      data: response,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.postCart = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findById(productId);
    const result = await req.user.addToCart(product);
    return res.status(201).json({
      message: "Cart Product successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
