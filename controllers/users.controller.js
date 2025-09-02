const userModel = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async function (req, res) {
  try {
    let newUser = new userModel(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    newUser.password = hashedPassword;
    let user = await newUser.save();
    return res.json({
      message: "User registered successfully",
      user: { email: user.email, name: user.name },
    });
  } catch (err) {
    console.log("🚀 ~ register err:", err);
    res.status(400).send({
      message: err.message || err,
    });
  }
};

exports.login = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      res.status(400).send({ message: "Invalid Email or Password" });
    } else {
      const token = jwt.sign({ email: user.email, _id: user._id , role:user.role }, "secretKey");

      return res.json({
        message: "User Logged in successfully",
        user: { email: user.email, name: user.name, jwt: token },
      });
    }
  } catch (err) {
    console.log("🚀 ~ login err:", err);
    res.status(400).send({
      message: err.message || err,
    });
  }
};
