const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  profilePic: {
    type: String,
  },
  followers: {
    type: [],
    default: [],
  },
  following: {
    type: [],
    default: [],
  },
  likes: {
    type: [],
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
