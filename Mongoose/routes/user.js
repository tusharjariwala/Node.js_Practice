const express = require("express");
const userController = require("../controllers/user");
const userRouter = express.Router();

userRouter.post("/users", userController.addUser);
userRouter.get("/users/:userId", userController.getUserById);

module.exports = userRouter;
