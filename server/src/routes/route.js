const express = require("express");
const { authentication, authorization } = require("../middlewares/auth");
const {
  createUser,
  loginUser,
  getUser,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");
const {
  createBlog,
  getBlog,
  feed,
  likeBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// user APIs

//register a user
router.post("/create-user", createUser);

//login user
router.post("/login-user", loginUser);

//fetch user profile
router.get("/:userName", authentication, authorization, getUser);

//update user profile
router.post("/update-user/:userName", authentication, authorization, updateUserProfile);

//delete user profile
router.delete("/:userName", authentication, authorization, deleteUser);

// blog APIs

//create blog
router.post("/create-blog", authentication, authorization, createBlog);

//like a blog
router.post("/like-blog", authentication, likeBlog);

//fetch a blog
router.get("/:blogId", getBlog);

//fetch all blogs
router.get("/", feed);

//update a blog
router.post("/:blogId", authentication, authorization, updateBlog);

//delete a blog
router.delete("/:blogId", authentication, authorization, deleteBlog);

router.all("/**", function (req, res) {
  res
    .status(404)
    .send({ status: false, msg: "The api you requested is not available" });
});

module.exports = router;
