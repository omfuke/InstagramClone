const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/default.json");

//@Route api/users

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email }).exec();
    if (user) {
      return res.send("User exist");
    }

    user = new User({ name, email, password });
    console.log(user);
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          res.send(err);
        }
        user.password = hash;
      });
    });

    await user.save();
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

module.exports = router;
