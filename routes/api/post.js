const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const config = require("../../config/default.json");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
aws.config.update(config.awsConfig);
const s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "insta-social-clone",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "Testing Metadata" });
    },
    key: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const singleFileUpload = upload.single("file");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
//   },
// });

// const fileFlter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFlter });

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

router.post("/", auth, async (req, res) => {
  try {
    const posts = await User.findById(req.user.id).select("-password");

    singleFileUpload(req, res, async (error) => {
      if (error) {
        console.log("error", error);
      } else {
        if (req.file === undefined) {
          console.log("error file not selected");
        } else {
          const newPost = new Post({
            image: req.file.location,
            user: req.user.id,
          });

          const post = await newPost.save();

          return res.status(200).json(post);
        }
      }
    });
  } catch {
    return res.status(500).send("Server Error");
  }
});

router.get("/posts", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  if (!profile) {
    return;
  }
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

  return res.status(200).json(profile);
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
