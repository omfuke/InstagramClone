const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/default.json");
const auth = require("../../middleware/auth");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

//@Route api/auth

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).json({
        msg:
          "The username you entered doesn't belong to an account. Please check your username and try again.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password, isMatch);
    if (!isMatch) {
      return res.status(400).json({
        msg:
          "Sorry, your password was incorrect. Please double-check your password.",
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

router.post("/forgetPass", async (req, res) => {
  const email = req.body.email;
  console.log("hello", email);

  const token = crypto.randomBytes(64).toString("hex");
  console.log(token);
  const user = await User.findOne({ email: email });
  user.token = token;
  await user.save();

  let info = await transporter.sendMail({
    to: email,
    from: "omfuke512@gmail.com",
    subject: "reset password",
    html: `<h1>click below for reset password</h1>
    <a href="http://localhost:3000/resetPass?token=${token}">reset password</a>`,
  });

  return;
});

router.post("/resetPass/", async (req, res) => {
  const { email, password1, password2, token } = req.body;

  const user = await User.findOne({ email: email });
  if (password1 === password2 && user.token === token) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password1, salt);
  }

  await user.save();

  console.log(token);
  return res.status(200).json({ msg: "New password is Set" });
});

module.exports = router;
