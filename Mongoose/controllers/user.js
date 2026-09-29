const User = require("../models/user");

exports.addUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const user = new User(username, email);
    const result = await user.save();
    return result;
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = await req.params.userId;
    const result = await User.findById(userId);
    return res.status(201).json({
      message: "User is find ",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
