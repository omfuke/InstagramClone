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
    default: null,
  },
  followers: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "user" } }],
  following: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "user" } }],
});

module.exports = Profile = mongoose.model("profile", userProfile);
