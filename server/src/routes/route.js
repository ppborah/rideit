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
  likeBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// user APIs
router.post("/create-user", createUser);
router.post("/login-user", loginUser);
router.get("/:userName", authentication, authorization, getUser);
router.post(
  "/update-user/:userName",
  authentication,
  authorization,
  updateUserProfile
);
router.delete("/:userName", authentication, authorization, deleteUser);

// blog APIs
router.post("/create-blog", authentication, authorization, createBlog);
router.post("/like-blog", authentication, likeBlog);
router.get("/", getBlog);
router.post("/update-blog", authentication, authorization, updateBlog);
router.delete("/delete-blog", authentication, authorization, deleteBlog);

router.all("/**", function (req, res) {
  res
    .status(404)
    .send({ status: false, msg: "The api you requested is not available" });
});

module.exports = router;
