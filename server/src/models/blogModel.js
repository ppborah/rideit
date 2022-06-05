const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    blogImage: {
      type: String
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
