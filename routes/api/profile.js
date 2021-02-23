const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const auth = require("../../middleware/auth");

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
    console.log(profile);
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

    console.log(oProfile);

    await profile.save();
    await oProfile.save();

    res.status(200).json({ profile, oProfile });
  } catch {
    res.status(500).send("Server Eroor");
  }
});

router.post("/makeProfile", auth, async (req, res) => {
  console.log("hello");
  console.log(req.body);
  const update = req.body;
  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    update,
    { new: true }
  );
  console.log(profile);

  return;
});

router.get("/:name", auth, async (req, res) => {
  const name = req.params.name;
  try {
    const userProfile = await Profile.findOne({ name: name });
    const userProfilePosts = await Post.find({ user: userProfile.user });
    console.log(userProfilePosts);

    return res.json({ userProfile, userProfilePosts });
  } catch {
    res.status(500).json({ msg: "server error" });
  }
});

router.post("/", [auth, upload.single("file")], async (req, res) => {
  // const { name, bio } = req.body;
  // const profileImage = req.file;

  console.log(req.file);

  const userProfile = {};
  userProfile.user = req.user.id;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.profileImage = req.file.path;
    await profile.save();

    return res.status(200).json({ msg: "user updated" });
  } catch {
    res.status(200).json({ msg: "server error" });
  }
});

module.exports = router;
