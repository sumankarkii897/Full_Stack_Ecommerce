const express = require("express");
const { createBlog, getAllBlogs, getBlogById } = require("../controllers/blogController");
const router = express.Router();

router.post("/", createBlog )
router.get("/" , getAllBlogs)
router.get("/:id" , getBlogById)

module.exports = router;