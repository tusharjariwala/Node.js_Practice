require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const shopRouter = require("./routes/shop");
const User = require("./models/user");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("6abbde18680fc588ffc301fc");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/", shopRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB connected");

    const existingUser = await User.findOne();

    if (!existingUser) {
      const user = new User({
        name: "Max",
        email: "max@test.com",
        cart: {
          items: [],
        },
      });

      await user.save();
    }

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
