const blogModel = require("../models/blogModel");

const createBlog = async function (req, res) {
  try {
    let files = req.files;
    let data = { ...req.body };

    let blogCreated = await blogModel.create(data);
    res.status(201).send({ status: true, data: blogCreated });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", error: err.message });
  }
};

const getBlog = async function (req, res) {
  let data = await blogModel.find({ isDeleted: false });
  res.status(200).send({ status: true, data: data });
};

const likeBlog = async function (req, res) {
  let userId = req.params.userName;

  let blog = await blogModel.find({ userId: userId });
  if (!blog.likes.includes(userId)) {
    blog.likes.push(userId);
  } else {
    let index = blog.likes.indexOf(userId);
    blog.likes[index] = "";
  }
  await blog.save();
};

const updateBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let data = req.body;

    const { heading, description } = data;

    let blogDoc = await blogModel.find({ _id: blogId });

    if (data.hasOwnProperty("heading")) {
      blogDoc.heading = heading;
    }
    if (data.hasOwnProperty("description")) {
      blogDoc.description = description;
    }

    await blogDoc.save();
    res.status(200).send({
      status: true,
      message: "Updation sucessful!",
      data: blogDoc,
    });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", error: err.message });
  }
};

const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;

    await blogModel.findOneAndUpdate(
      {
        _id: blogId,
      },
      {
        isDeleted: true,
      }
    );
    res.status(200).send();
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", error: err.message });
  }
};

module.exports = { createBlog, getBlog, likeBlog, updateBlog, deleteBlog };
