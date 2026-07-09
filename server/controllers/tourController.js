const Tour = require("../models/Tour_models");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// file delete function
const deleteFile = (filePath) => {
  if (!filePath) return;
  const relativePath = filePath.includes(BASE_URL)
    ? filePath.split(BASE_URL)[1]
    : filePath;
  const fullPath = path.join(__dirname, "..", relativePath);

  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) console.error("File delete error:", err);
    });
  }
};

// data formatting function
const formatTourData = (tour) => {
  const tourData = tour.toJSON();

  if (tourData.highlights && typeof tourData.highlights === "string") {
    try {
      tourData.highlights = JSON.parse(tourData.highlights);
    } catch (e) {
      console.error("Error parsing tour highlights:", e);
      tourData.highlights = []; 
    }
  }

  if (!tourData.highlights || !Array.isArray(tourData.highlights)) {
    tourData.highlights = [];
  }

  if (tourData.images && typeof tourData.images === "string") {
    try {
      tourData.images = JSON.parse(tourData.images);
    } catch (e) {
      console.error("Error parsing tour images:", e);
      tourData.images = [];
    }
  }

  if (tourData.images && Array.isArray(tourData.images)) {
    tourData.images = tourData.images.map((img) =>
      img.startsWith("http") ? img : `${BASE_URL}${img}`
    );
  } else {
    tourData.images = []; 
  }

  return tourData;
};

// 1. create tour data
exports.createTour = async (req, res) => {
  try {
    const {
      title,
      location,
      duration,
      groupSize,
      price,
      rating,
      reviews,
      category,
      highlights,
      description,
    } = req.body;

    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map(
        (file) => `/uploads/${req.uploadFolder}/${file.filename}`
      );
    }

    const newTour = await Tour.create({
      title,
      location,
      duration,
      groupSize,
      price,
      rating: rating || 0,
      reviews: reviews || 0,
      category,
      images: imagePaths,
      highlights: typeof highlights === "string" ? JSON.parse(highlights) : highlights,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Tour created successfully",
      data: formatTourData(newTour),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. get all tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.findAll({ order: [["createdAt", "DESC"]] });
    const formattedTours = tours.map((tour) => formatTourData(tour));

    res.status(200).json({ success: true, data: formattedTours });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. get tour by ID
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour)
      return res
        .status(404)
        .json({ success: false, message: "ট্যুরটি পাওয়া যায়নি" });

    res.status(200).json({ success: true, data: formatTourData(tour) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. update tour
exports.updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByPk(id);

    if (!tour)
      return res.status(404).json({ success: false, message: "no tour found" });

    // ১. অবজেক্ট একদম ক্লিন রাখা (req.body এর বাইরের আবর্জনা বাদ দিতে)
    const updateFields = {
      title: req.body.title,
      location: req.body.location,
      duration: req.body.duration,
      groupSize: req.body.groupSize,
      price: req.body.price,
      category: req.body.category,
    };

    // ডেসক্রিপশন, রেটিং, রিভিউ সেফ হ্যান্ডলিং
    if (req.body.description) {
      updateFields.description = Array.isArray(req.body.description) 
        ? req.body.description[0] 
        : req.body.description;
    }
    if (req.body.rating) updateFields.rating = parseFloat(req.body.rating);
    if (req.body.reviews) updateFields.reviews = parseInt(req.body.reviews);

    // ২. Highlights Handling (পিওর অ্যারে রাখতে হবে, স্ট্রিংফাই নয়)
    let finalHighlights = [];
    if (req.body.highlights) {
      try {
        finalHighlights = typeof req.body.highlights === "string"
          ? JSON.parse(req.body.highlights)
          : req.body.highlights;
      } catch (e) {
        if (typeof req.body.highlights === "string") {
          finalHighlights = req.body.highlights.split(',').map(h => h.trim());
        }
      }
    }

    // ফ্রন্টএন্ড থেকে কিছু না আসলে ডেটাবেজের পুরোনো ডেটা ব্যাকআপ নেওয়া
    if (!Array.isArray(finalHighlights) || finalHighlights.length === 0) {
      let oldHighlights = tour.highlights;
      if (typeof oldHighlights === "string") {
        try { oldHighlights = JSON.parse(oldHighlights); } catch(err) { oldHighlights = []; }
      }
      finalHighlights = Array.isArray(oldHighlights) ? oldHighlights : [];
    }
    updateFields.highlights = finalHighlights; // পিওর অ্যারে পাস করা হলো

    // ৩. Image Handling
    let finalImages = [];
    let checkExisting = false;

    if (req.body.existingImages) {
      try {
        const existing = typeof req.body.existingImages === "string"
          ? JSON.parse(req.body.existingImages)
          : req.body.existingImages;

        if (Array.isArray(existing)) {
          checkExisting = true;
          finalImages = existing.map((img) =>
            img.includes(BASE_URL) ? img.split(BASE_URL)[1] : img
          );
        }
      } catch (e) {
        console.error("Existing images parse error:", e);
      }
    }

    const hasNewFiles = req.files && req.files.length > 0;
    if (hasNewFiles) {
      const newImagePaths = req.files.map(
        (file) => `/uploads/${req.uploadFolder}/${file.filename}`
      );
      finalImages = [...finalImages, ...newImagePaths];
    }

    // ৪. ওল্ড ফাইল ডিলিট করার লজিক
    let dbOldImages = tour.getDataValue("images") || [];
    if (typeof dbOldImages === "string") {
      try { dbOldImages = JSON.parse(dbOldImages); } catch (e) { dbOldImages = []; }
    }

    if (checkExisting || hasNewFiles) {
      if (Array.isArray(dbOldImages)) {
        dbOldImages.forEach((oldPath) => {
          if (!finalImages.includes(oldPath)) {
            deleteFile(oldPath);
          }
        });
      }
      updateFields.images = finalImages; // পিওর অ্যারে পাস করা হলো
    } else {
      // যদি ফ্রন্টএন্ড থেকে নতুন ছবি বা এক্সিস্টিং ইমেজের কোনো ডেটা না আসে
      updateFields.images = Array.isArray(dbOldImages) ? dbOldImages : [];
    }

    // ৫. ডাটাবেজ আপডেট ও রেসপন্স
    await tour.update(updateFields);
    
    // রি-ফেচ করে ফ্রেশ ডেটা রিটার্ন
    const updatedTour = await Tour.findByPk(id);
    res.status(200).json({
      success: true,
      message: "ট্যুর সফলভাবে আপডেট হয়েছে",
      data: formatTourData(updatedTour),
    });
  } catch (error) {
    console.error("Update Tour Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// 5. delete tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour)
      return res
        .status(404)
        .json({ success: false, message: "ট্যুরটি পাওয়া যায়নি" });

    let imagesToDelete = tour.getDataValue("images") || [];
    if (typeof imagesToDelete === "string") {
      try { imagesToDelete = JSON.parse(imagesToDelete); } catch(e) { imagesToDelete = []; }
    }

    if (Array.isArray(imagesToDelete) && imagesToDelete.length > 0) {
      imagesToDelete.forEach((imagePath) => deleteFile(imagePath));
    }

    await tour.destroy(); 
    res.status(200).json({
      success: true,
      message: "ট্যুর এবং সংশ্লিষ্ট সব ছবি ডিলিট করা হয়েছে",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};