const express = require("express");
const { createBlog } = require("../controllers/blogController");
const router = express.Router();
const { authentication, authorisation } = require("../middlewares/auth");

router.post("/create-blog", authentication, authorisation, createBlog);

router.get("/", getBlog);

router.all("/**", function (req, res) {
  res
    .status(404)
    .send({ status: false, msg: "The api you requested is not available" });
});

module.exports = router;
