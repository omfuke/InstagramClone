const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFlter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFlter });

router.get("/", auth, async (req, res) => {
  // const profile = await Profile.findOne({ user: req.user.id });
  const post = await Post.findOne({ user: req.user.id });

  return res.json(post);
});

router.post("/", [auth, upload.single("file")], async (req, res) => {
  try {
    console.log(req.file);
    const posts = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      image: req.file.path,
      user: req.user.id,
    });

    const post = await newPost.save();
    res.json(post);
  } catch {
    res.status(500).send("Server Error");
  }
});

router.get("/posts", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  const images = [];
  for (let index = 0; index < profile.following.length; index++) {
    const element = profile.following[index];
    const otherProfile = await Post.findOne({ user: element.user });

    images.push(otherProfile);
  }
  console.log(images);
  return res.json(images);
});

module.exports = router;
