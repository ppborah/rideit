const express = require("express");
const { createBlog } = require("../controllers/blogController");
const { authentication, authorization } = require("../middlewares/auth");
const { createUser, loginUser, getUser, updateUserProfile, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/create-user', createUser);
router.post('/login-user', loginUser);
router.get('/:userName', authentication, authorization, getUser);
router.post('/update-user/:userName', authentication, authorization, updateUserProfile);
router.delete('/:userName', authentication, authorization, deleteUser);


router.post("/create-blog", authentication, authorization, createBlog);
router.get("/", getBlog);

router.all("/**", function (req, res) {
  res
    .status(404)
    .send({ status: false, msg: "The api you requested is not available" });
});

module.exports = router;
