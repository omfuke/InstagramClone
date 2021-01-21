const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");

// @Route /api/user/me

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

router.post("/", auth, async (req, res) => {
  const { name, bio } = req.body;

  const userProfile = {};
  userProfile.user = req.user.id;
  if (name) userProfile.name = name;
  if (bio) userProfile.bio = bio;

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
