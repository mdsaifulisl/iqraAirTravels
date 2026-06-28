const Tour = require("../models/Tour_models");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // .env ফাইল লোড করার জন্য

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// file delete function
const deleteFile = (filePath) => {
  // filepath base url
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
  if (tourData.images && Array.isArray(tourData.images)) {
    tourData.images = tourData.images.map((img) =>
      img.startsWith("http") ? img : `${BASE_URL}${img}`,
    );
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
        (file) => `/uploads/${req.uploadFolder}/${file.filename}`,
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
      highlights:
        typeof highlights === "string" ? JSON.parse(highlights) : highlights,
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

    // ১. data sanitization
    const updateData = { ...req.body };

    // Description Fix: নিশ্চিত করা যে এটি স্ট্রিং এবং ভ্যালিড
    if (updateData.description) {
      if (Array.isArray(updateData.description)) {
        updateData.description = updateData.description[0];
      }
    } else {
      // যদি বডিতে ডেসক্রিপশন না থাকে, তবে আগেরটাই রাখো
      updateData.description = tour.description;
    }

    // রেটিং এবং রিভিউ ফিক্স
    updateData.rating = (updateData.rating === "" || !updateData.rating) 
      ? tour.rating 
      : parseFloat(updateData.rating);
    
    updateData.reviews = (updateData.reviews === "" || !updateData.reviews) 
      ? tour.reviews 
      : parseInt(updateData.reviews);

    // ২. highlights handling
    if (updateData.highlights) {
      try {
        if (typeof updateData.highlights === "string") {
          updateData.highlights = JSON.parse(updateData.highlights);
        }
      } catch (e) {
        updateData.highlights = tour.highlights;
      }
    }

    // ৩. image handling (আপনার লজিক ঠিক আছে)
    let finalImages = [];
    if (req.body.existingImages) {
      try {
        const existing = JSON.parse(req.body.existingImages);
        finalImages = existing.map((img) =>
          img.includes(BASE_URL) ? img.split(BASE_URL)[1] : img
        );
      } catch (e) { console.error("Existing images error"); }
    }

    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map(
        (file) => `/uploads/${req.uploadFolder}/${file.filename}`
      );
      finalImages = [...finalImages, ...newImagePaths];
    }

    // ৪. file deletion
    const oldImages = tour.getDataValue("images") || [];
    oldImages.forEach((oldPath) => {
      if (!finalImages.includes(oldPath)) {
        deleteFile(oldPath);
      }
    });

    updateData.images = finalImages.length > 0 ? finalImages : tour.images;

    // ৫. database update (এখানেই আসল পরিবর্তন)
    await tour.update(updateData);

    res.status(200).json({
      success: true,
      message: "ট্যুর সফলভাবে আপডেট হয়েছে",
      data: formatTourData(tour),
    });
  } catch (error) {
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

    // ডাটাবেজ থেকে অরিজিনাল পাথ নিয়ে ফাইল ডিলিট করা
    const imagesToDelete = tour.getDataValue("images") || [];
    if (imagesToDelete.length > 0) {
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
