const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routers/users.router.js");
const bookRouter = require("./routers/books.router.js");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3300;
const mongoDB_URI = process.env.MONGO_URI;

const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoDB_URI);
    console.log("🚀 ~ Connected to MongoDB ~ 🚀");
  } catch (err) {
    console.log("🚀 ~ connectToDB ~ error:", err);
    process.exit(1);
  }
};
connectToDB();

app.use("/", userRouter);
app.use("/", bookRouter);
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
