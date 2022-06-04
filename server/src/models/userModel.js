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
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: String,
    bio: String,
    isDeleted: true,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", userSchema);
