const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: Number,
  userName: String,
  userProfile: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
