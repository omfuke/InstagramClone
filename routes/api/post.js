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
  const post = await Post.find({ user: req.user.id });

  return res.json(post);
});

router.get("/otherPost/:postId", auth, async (req, res) => {
  // const profile = await Profile.findOne({ user: req.user.id });
  const post = await Post.findById(req.params.postId);
  console.log(post);

  return res.json(post);
});

router.post("/", [auth, upload.single("file")], async (req, res) => {
  try {
    const posts = await User.findById(req.user.id).select("-password");
    console.log(req.file);
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
  let images = [];
  for (let index = 0; index < profile.following.length; index++) {
    const element = profile.following[index];
    const otherProfile = await Post.find({ user: element.user });

    if (otherProfile) {
      images = [...images, ...otherProfile];
    }
    continue;
  }

  return res.json(images);
});

router.post("/user", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.body.user });

  res.json(profile);
});

router.post("/comment/:postId", auth, async (req, res) => {
  const postId = req.params.postId;
  console.log(`comment here ${postId}`);

  const post = await Post.findById(req.params.postId);
  const profile = await Profile.findOne({ user: req.user.id });

  post.comments.unshift({
    user: req.user.id,
    name: profile.name,
    comment: req.body.comment,
  });
  await post.save();

  return res.json(post);
});

router.get("/like/:postId", auth, async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (post.likes.filter((p) => p.user.toString() === req.user.id).length > 0) {
    const removeIndex = post.likes
      .map((p) => p.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    return res.json(post.likes);
  }

  post.likes.unshift({ user: req.user.id });
  await post.save();

  return res.json(post.likes);
});

module.exports = router;
