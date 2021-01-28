const mongoose = require("mongoose");

const userPost = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  text: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
  ],
});

module.exports = Post = mongoose.model("post", userPost);
