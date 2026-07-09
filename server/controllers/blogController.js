const Blog = require("../models/Blog_models");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000"; 

// ফাইল ডিলিট করার ফাংশন
const deleteFile = (filePath) => {
  if (!filePath) return;
  const relativePath = filePath.includes(BASE_URL)
    ? filePath.split(BASE_URL)[1]
    : filePath;
  const fullPath = path.join(__dirname, "..", relativePath);

  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) console.error("ব্লগ ইমেজ ডিলিট করতে সমস্যা:", err);
    });
  }
};

// ডাটা ফরম্যাটিং (ইমেজ ইউআরএল ফুল করার জন্য)
const formatBlogData = (blog) => {
  const blogData = blog.toJSON();

  if (blogData.images && typeof blogData.images === "string") {
    try {
      blogData.images = JSON.parse(blogData.images);
    } catch (e) {
      console.error("Error parsing blog images:", e);
      blogData.images = [];
    }
  }

  if (blogData.images && Array.isArray(blogData.images)) {
    blogData.images = blogData.images.map((img) =>
      img.startsWith("http") ? img : `${BASE_URL}${img}`
    );
  } else {
    blogData.images = [];
  }

  return blogData;
};

// 1. Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, author, category, content, date } = req.body; 

    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map(
        (file) => `/uploads/${req.uploadFolder}/${file.filename}`
      );
    }

    const newBlog = await Blog.create({
      title,
      author,
      date: date || new Date().toLocaleDateString(), 
      category,
      content, 
      images: imagePaths, // Sequelize নিজেই হ্যান্ডেল করবে
    });

    res.status(201).json({
      success: true,
      message: "blog created and published successfully",
      data: formatBlogData(newBlog),
    });
  } catch (error) {
    console.error("Create Blog Error:", error); 
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [["createdAt", "DESC"]] });
    const formattedBlogs = blogs.map((blog) => formatBlogData(blog));

    res.status(200).json({ success: true, data: formattedBlogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Get Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, data: formatBlogData(blog) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByPk(id);

    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    // ১. আপডেট অবজেক্ট একদম পরিষ্কার রাখা (req.body-র বাড়তি আবর্জনা বা existingImages যাতে সরাসরি না ঢোকে)
    const updateData = {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      content: req.body.content,
      date: req.body.date
    };

    // ২. ইমেজ হ্যান্ডলিং
    let finalImages = [];
    let checkExisting = false;
    
    if (req.body.existingImages) {
      try {
        const existing = typeof req.body.existingImages === 'string' 
          ? JSON.parse(req.body.existingImages) 
          : req.body.existingImages;

        if (Array.isArray(existing)) {
          checkExisting = true;
          finalImages = existing.map((img) =>
            img.includes(BASE_URL) ? img.split(BASE_URL)[1] : img
          );
        }
      } catch (e) {
        console.error("Existing images parsing error:", e);
      }
    } 

    const hasNewFiles = req.files && req.files.length > 0;
    if (hasNewFiles) {
      const newImagePaths = req.files.map(
        (file) => `/uploads/${req.uploadFolder}/${file.filename}`
      );
      finalImages = [...finalImages, ...newImagePaths];
    }

    // ৩. ওল্ড ফাইল ডিলিট করার লজিক 
    let oldImages = blog.getDataValue("images") || [];
    if (typeof oldImages === 'string') {
      try { oldImages = JSON.parse(oldImages); } catch (e) { oldImages = []; }
    }

    if (checkExisting || hasNewFiles) {
      if (Array.isArray(oldImages)) {
        oldImages.forEach((oldPath) => {
          if (!finalImages.includes(oldPath)) {
            deleteFile(oldPath);
          }
        });
      }
      updateData.images = finalImages; // Sequelize ডাটাবেজ মডেল অনুযায়ী পিওর অ্যারে পাস
    } else {
      // যদি ফ্রন্টএন্ড থেকে কোনো ছবির ডেটা বা নতুন ফাইল না আসে, আগেরটাই থাকবে
      updateData.images = Array.isArray(oldImages) ? oldImages : [];
    }

    // ৪. ডাটাবেজ আপডেট
    await blog.update(updateData);

    const updatedBlog = await Blog.findByPk(id);
    res.status(200).json({
      success: true,
      message: "blog updated successfully",
      data: formatBlogData(updatedBlog),
    });
  } catch (error) {
    console.error("Update Blog Error in Production:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// 5. Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    // সার্ভার থেকে ছবিগুলো ডিলিট করা (স্ট্রিং বা অ্যারে সেফটি ফিক্স)
    let imagesToDelete = blog.getDataValue("images") || [];
    if (typeof imagesToDelete === "string") {
      try { imagesToDelete = JSON.parse(imagesToDelete); } catch(e) { imagesToDelete = []; }
    }

    if (Array.isArray(imagesToDelete) && imagesToDelete.length > 0) {
      imagesToDelete.forEach((imagePath) => deleteFile(imagePath));
    }

    await blog.destroy();
    res.status(200).json({
      success: true,
      message: "blog and all its images have been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};