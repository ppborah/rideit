const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookmarked: {
      type: [String],
    },
    profileImage: String,
    bio: String,
    isDeleted: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
