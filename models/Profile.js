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
});

module.exports = Profile = mongoose.model("profile", userProfile);
