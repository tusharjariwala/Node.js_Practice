const user = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = async (req, res, next) => {
  // console.log(req.get("Cookie")?.split("=")[1], "tetsing");
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAutheticated: false,
  });
};

exports.postLogin = async (req, res, next) => {
  // req.session.isLoggedIn = true;
  // res.setHeader("Set-Cookie", "loggedIn=true;HttpOnly");
  // res.redirect("/");
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({
      email: email,
    });
    if (!existingUser) {
      return res.redirect("/login");
    }
    const matchPass = await bcrypt.compare(password, existingUser.password);
    if (matchPass) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save((error) => {
        res.redirect("/product");
      });
    }
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.redirect("/login");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAutheticated: false,
  });
};

exports.postSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const bcryptPassowrd = await bcrypt.hash(password, 12);
    const users = new user({
      email,
      password: bcryptPassowrd,
      cart: { items: [] },
    });
    const existingUser = await user.findOne({
      email: email,
    });
    if (existingUser) {
      return res.redirect("/signup");
    }
    await users.save();
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
