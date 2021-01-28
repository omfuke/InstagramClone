const mongoose = require("mongoose");

const userProfile = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bio: {
    type: String,
  },
  name: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  followers: [
    { user: { type: mongoose.Schema.Types.ObjectId, ref: "profile" } },
  ],
  following: [
    { user: { type: mongoose.Schema.Types.ObjectId, ref: "profile" } },
  ],
});

module.exports = Profile = mongoose.model("profile", userProfile);
