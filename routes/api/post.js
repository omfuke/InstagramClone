const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");

router.get("/", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  const post = await Post.findOne({ user: profile.user });

  return res.json(post);
});

router.post("/", auth, async (req, res) => {
  try {
    const posts = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      user: req.user.id,
    });

    const post = await newPost.save();
    res.json(post);
  } catch {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
