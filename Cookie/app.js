require("dotenv").config();
//csrf => cross site request forgery

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const csrf = require("csurf");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const shopRouter = require("./routes/shop");
const User = require("./models/user");
const user = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

app.use((req, res, next) => {
  if (!req.session.userId) {
    return next();
  }
  user
    .findById(req.session.userId)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use("/", shopRouter);
app.use(authRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use(flash());
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
