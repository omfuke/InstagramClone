const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const auth = require("../../middleware/auth");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const config = require("../../config/default.json");
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

// const multer = require("multer");
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
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const allProfile = await Profile.find({});
    const result = allProfile.filter((p) => p.name !== profile.name);
    return res.json(result);
  } catch {
    res.status(500).json({ msg: "server error" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // if (!profile) {
    //   profile = new Profile({ user: req.user.id, name: req.user.name });
    //   await profile.save();
    //   return res.status(200).json(profile);
    // }

    return res.status(200).json(profile);
  } catch {
    res.status(500).send("Server Eroor");
  }
});

router.post("/followProfile", auth, async (req, res) => {
  try {
    const otherProfile = req.body.user;
    const profile = await Profile.findOne({ user: req.user.id });
    const oProfile = await Profile.findOne({ user: otherProfile });

    oProfile.followers.unshift({ user: req.user.id });

    // if (profile.following.filter((p) => p.user == otherProfile).length > 0) {
    //   return res.status(200).json(profile);
    // }

    profile.following.unshift({ user: otherProfile });

    await profile.save();
    await oProfile.save();

    res.status(200).json({ profile, oProfile });
  } catch {
    res.status(500).send("Server Eroor");
  }
});

router.post("/unfollowProfile", auth, async (req, res) => {
  try {
    const otherProfile = req.body.user;
    const profile = await Profile.findOne({ user: req.user.id });
    const oProfile = await Profile.findOne({ user: otherProfile });

    // if (profile.following.filter((p) => p.user == otherProfile).length > 0) {
    //   return res.status(200).json(profile);
    // }

    const index = oProfile.followers
      .map((p) => p.user.toString())
      .indexOf(req.user.id);
    oProfile.followers.splice(index, 1);

    const removeIndex = profile.following
      .map((p) => p.user.toString())
      .indexOf(otherProfile);
    profile.following.splice(removeIndex, 1);

    await profile.save();
    await oProfile.save();

    res.status(200).json({ profile, oProfile });
  } catch {
    res.status(500).send("Server Eroor");
  }
});

router.post("/makeProfile", auth, async (req, res) => {
  const update = req.body;
  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    update,
    { new: true }
  );

  return;
});

router.get("/:name", auth, async (req, res) => {
  const name = req.params.name;
  try {
    const userProfile = await Profile.findOne({ name: name });
    const userProfilePosts = await Post.find({ user: userProfile.user });

    return res.json({ userProfile, userProfilePosts });
  } catch {
    res.status(500).json({ msg: "server error" });
  }
});

router.post("/", auth, async (req, res) => {
  const userProfile = {};
  userProfile.user = req.user.id;
  singleFileUpload(req, res, async (error) => {
    if (error) {
    } else {
      if (req.file === undefined) {
      } else {
        try {
          let profile = await Profile.findOne({ user: req.user.id });
          profile.profileImage = req.file.location;
          await profile.save();

          return res.status(200).json({ msg: "user updated" });
        } catch {
          res.status(200).json({ msg: "server error" });
        }
      }
    }
  });
});

module.exports = router;
