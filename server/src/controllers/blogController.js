const blogModel = require("../models/blogModel");

const createBlog = async function (req, res) {
  try {
    let data = req.body;

    let blogCreated = await blogModel.create(data);
    res.status(201).send({ status: true, data: blogCreated });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", error: err.message });
  }
};

const getBlog = async function (req, res) {
  let data = await blogModel.find();
  res.status(200).send({ status: true, data: data });
};

module.exports = { createBlog, getBlog };
