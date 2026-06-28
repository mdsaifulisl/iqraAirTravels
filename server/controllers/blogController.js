const Blog = require("../models/Blog_models"); // আপনার ব্লগ মডেলের নাম অনুযায়ী পরিবর্তন করুন
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// ফাইল ডিলিট করার ফাংশন
const deleteFile = (filePath) => {
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
  if (blogData.images && Array.isArray(blogData.images)) {
    blogData.images = blogData.images.map((img) =>
      img.startsWith("http") ? img : `${BASE_URL}${img}`
    );
  }
  return blogData;
};

// 1. Create Blog
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
      images: imagePaths,
    });

    res.status(201).json({
      success: true,
      message: "blog created and published successfully",
      data: formatBlogData(newBlog),
    });
  } catch (error) {
    // এররটি কনসোলে প্রিন্ট করুন যাতে আপনি দেখতে পারেন আসলে কী সমস্যা হচ্ছে
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
      return res.status(404).json({ success: false, message: "ব্লগ পাওয়া যায়নি" });

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
      return res.status(404).json({ success: false, message: "ব্লগ পাওয়া যায়নি" });

    const updateData = { ...req.body };

    // ইমেজ হ্যান্ডলিং
    let finalImages = [];
    
    // ফ্রন্টএন্ড থেকে আসা বিদ্যমান ইমেজ (যা ডিলিট করা হয়নি)
    if (req.body.existingImages) {
      try {
        const existing = JSON.parse(req.body.existingImages);
        finalImages = existing.map((img) =>
          img.includes(BASE_URL) ? img.split(BASE_URL)[1] : img
        );
      } catch (e) {
        console.error("Existing images parsing error");
      }
    }

    // নতুন আপলোড করা ইমেজ যোগ করা
    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map(
        (file) => `/uploads/${req.uploadFolder}/${file.filename}`
      );
      finalImages = [...finalImages, ...newImagePaths];
    }

    // ফাইল ডিলিট করার লজিক (যেগুলো আগের লিস্টে ছিল কিন্তু এখন নেই)
    const oldImages = blog.getDataValue("images") || [];
    oldImages.forEach((oldPath) => {
      if (!finalImages.includes(oldPath)) {
        deleteFile(oldPath);
      }
    });

    updateData.images = finalImages;

    // ডাটাবেজ আপডেট
    await blog.update(updateData);

    res.status(200).json({
      success: true,
      message: "ব্লগ সফলভাবে আপডেট হয়েছে",
      data: formatBlogData(blog),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 5. Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog)
      return res.status(404).json({ success: false, message: "ব্লগ পাওয়া যায়নি" });

    // সার্ভার থেকে ছবিগুলো ডিলিট করা
    const imagesToDelete = blog.getDataValue("images") || [];
    if (imagesToDelete.length > 0) {
      imagesToDelete.forEach((imagePath) => deleteFile(imagePath));
    }

    await blog.destroy();
    res.status(200).json({
      success: true,
      message: "ব্লগ এবং এর সকল ছবি ডিলিট করা হয়েছে",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

