const express = require("express");
const { authentication, authorisation } = require("../middlewares/auth");
const {
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  createBlog,
  getFeed,
  getBlogById,
  getBlogOwn,
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
router.get("/:userId", authentication, authorisation, getUser);

//update user profile
router.post(
  "/update-user/:userName",
  authentication,
  authorisation,
  updateUser
);

//delete user profile
router.delete("/:userName", authentication, authorisation, deleteUser);

// blog APIs
router.get("/", getFeed);
router.get("/blog/:blogId", getBlogById);
router.get("/:userId/blogs", getBlogOwn);
router.post("/like-blog", authentication, likeBlog);
router.post("/create-blog", authentication, authorisation, createBlog);
router.post("/:blogId/:userName", authentication, authorisation, updateBlog);
router.delete("/:blogId/:userId", authentication, authorisation, deleteBlog);

router.all("/**", function (req, res) {
  res
    .status(404)
    .send({ status: false, msg: "The api you requested is not available" });
});

module.exports = router;
