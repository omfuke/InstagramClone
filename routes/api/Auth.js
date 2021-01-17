const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/default.json");
const auth = require("../../middleware/auth");

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
      return res.status(400).json({ msg: "Invalid Credentails" });
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          res.send(err);
        }
        bcrypt.compare(password, hash, function (err, result) {
          if (err) {
            throw err;
          }

          if (!result) {
            return res.status(500).json({ msg: "Invalid Credentails" });
          }
          const payload = {
            user: {
              id: user.id,
            },
          };

          jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({ token, user });
            }
          );
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

module.exports = router;
