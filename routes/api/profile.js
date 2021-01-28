const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
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

    if (profile) {
      return res.status(200).json(profile);
    }

    res.status(200).json(profile);
  } catch {
    res.status(500).send("Server Eroor");
  }
});

router.get("/:name", auth, async (req, res) => {
  const name = req.params.name;
  try {
    const userProfile = await Profile.findOne({ name: name });
    return res.json(userProfile);
  } catch {
    res.status(500).json({ msg: "server error" });
  }
});

router.post("/", [auth, upload.single("profileImage")], async (req, res) => {
  const { name, bio } = req.body;
  const profileImage = req.file;
  console.log(req.file);

  const userProfile = {};
  userProfile.user = req.user.id;
  if (name) userProfile.name = name;
  if (bio) userProfile.bio = bio;
  if (profileImage) userProfile.profileImage = req.file.path;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        userProfile,
        { new: true }
      );
      return res.status(200).json({ msg: "user updated" });
    }
    profile = new Profile(userProfile);
    await profile.save();

    res.status(200).send(profile);
  } catch {
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
