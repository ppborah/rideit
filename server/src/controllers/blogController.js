const blogModel = require("../models/blogModel");
const { uploadFile } = require("../aws/awsUpload");

//=========================================== Create Blog ==============================================================================================

const createBlog = async function (req, res) {
  try {
    let files = req.files;
    let data = { ...req.body };
    data.userId = req.userId;

    if (files?.length) {
      let blogImageUrl = await uploadFile(files[0]);
      data.blogImage = blogImageUrl;
    }

    let blogCreated = await blogModel.create(data);
    res.status(201).send({ status: true, data: blogCreated });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

//=========================================== Get Blog(Feed) ===========================================================================================

const getFeed = async function (req, res) {
  let blogDoc = await blogModel.find({ isDeleted: false }).populate("userId");

  res.status(200).send({ status: true, data: blogDoc });
};

//=========================================== Get Blog(byId) ===========================================================================================

const getBlogById = async function (req, res) {
  let blogId = req.params.blogId;

  let blogDoc = await blogModel.find({ _id: blogId, isDeleted: false });
  res.status(200).send({ status: true, data: blogDoc });
};

//=========================================== Get Blog(Own) ============================================================================================

const getBlogOwn = async function (req, res) {
  let blogDoc = await blogModel.find({
    userId: req.params.userId,
    isDeleted: false,
  });
  res.status(200).send({ status: true, data: blogDoc });
};

//=========================================== Like Blog ================================================================================================

const likeBlog = async function (req, res) {
  let blogId = req.params.blogId;

  let blog = await blogModel.find({ _id: blogId });
  if (!blog.likes.includes(userId)) {
    blog.likes.push(userId);
  } else {
    let index = blog.likes.indexOf(userId);
    blog.likes[index] = "";
  }
  await blog.save();
  res.status(200).send();
};

//=========================================== Update Blog ==============================================================================================

const updateBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let data = req.body;
    let files = req.files;

    const { heading, description } = data;

    let blogDoc = await blogModel.findOne({
      userId: req.userId,
      blogId: blogId,
    });

    if (data.hasOwnProperty("heading")) {
      blogDoc.heading = heading;
    }

    if (data.hasOwnProperty("description")) {
      blogDoc.description = description;
    }

    if (data.hasOwnProperty("content")) {
      blogDoc.content = content;
    }

    if (files?.length) {
      let blogImageUrl = await uploadFile(files[0]);
      blogDoc.blogImage = blogImageUrl;
    }

    await blogDoc.save();
    res.status(200).send({
      status: true,
      message: "Updated successfully!",
      data: blogDoc,
    });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", error: err.message });
  }
};

//=========================================== Delete Blog ==============================================================================================

const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;

    const blogDoc = await blogModel.findOneAndUpdate(
      {
        _id: blogId,
        isDeleted: false,
      },
      {
        isDeleted: true,
      }
    );

    if (!blogDoc) {
      return res.status(404).send({ status: false, message: "blog not found" });
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", error: err.message });
  }
};

//======================================================================================================================================================

module.exports = {
  createBlog,
  getFeed,
  getBlogById,
  getBlogOwn,
  likeBlog,
  updateBlog,
  deleteBlog,
};
