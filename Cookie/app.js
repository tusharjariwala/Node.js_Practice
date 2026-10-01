require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const shopRouter = require("./routes/shop");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", shopRouter);
app.use(authRouter);
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
