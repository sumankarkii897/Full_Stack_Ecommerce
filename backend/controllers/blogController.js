const Blog = require("../models/blogModel");
const cloudinary = require("cloudinary").v2;
exports.createBlog = async (req, res) => {
  try {
    const image = req.files.image;
    const result =await cloudinary.uploader.upload(image.tempFilePath, {
      folder : "blogs",
      width : 300,
      crop : "scale"

    })
    const blog = await Blog.create({
      ...req.body,
      image: {
        public_id: result.public_id,
        url: result.secure_url
      }
    });
    res.status(201).json({
      success : true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success : false,
      message: "Blog creation failed",
      error: error.message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success : true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success : false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success : false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success : true,
      message: `Blog with id ${blogId} fetched successfully`,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success : false,
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};
