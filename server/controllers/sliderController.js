const Slider = require("../models/Slider_models");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// --- Utility Functions ---

// 1. File delete function
const deleteFile = (filePath) => {
  if (!filePath) return;
  
  // If filepath contains BASE_URL, extract the relative path
  const relativePath = filePath.includes(BASE_URL)
    ? filePath.split(BASE_URL)[1]
    : filePath;
    
  const fullPath = path.join(__dirname, "..", relativePath);

  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) console.error("Slider Image delete error:", err);
    });
  }
};

// 2. Data formatting function (to add BASE_URL to image path)
const formatSliderData = (slider) => {
  const sliderData = slider.toJSON();
  if (sliderData.image) {
    sliderData.image = sliderData.image.startsWith("http") 
      ? sliderData.image 
      : `${BASE_URL}${sliderData.image}`;
  }
  return sliderData;
};

// --- Controller Actions ---

// 1. Create Slider
exports.createSlider = async (req, res) => {
  
  try {
    const { headline, subtext, btn1, btn2, link } = req.body;

    let imagePath = "";
    if (req.file) {
      // req.uploadFolder must be passed from the upload middleware
      imagePath = `/uploads/${req.uploadFolder}/${req.file.filename}`;
    }

    const newSlider = await Slider.create({
      headline,
      subtext,
      btn1,
      btn2,
      link,
      image: imagePath,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: "Slider created successfully",
      data: formatSliderData(newSlider),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Get All Sliders
exports.getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.findAll({ order: [["createdAt", "DESC"]] });
    const formattedSliders = sliders.map((slider) => formatSliderData(slider));

    res.status(200).json({ success: true, data: formattedSliders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Get Slider by ID
exports.getSliderById = async (req, res) => {
  try {
    const slider = await Slider.findByPk(req.params.id);
    if (!slider) {
      return res.status(404).json({ success: false, message: "Slider not found" });
    }

    res.status(200).json({ success: true, data: formatSliderData(slider) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. Update Slider
exports.updateSlider = async (req, res) => {
  try {
    const id = req.params.id;
    const slider = await Slider.findByPk(id);

    if (!slider) {
      return res.status(404).json({ success: false, message: "Slider not found" });
    }

    const updateData = { ...req.body };

    // Image Handling logic
    if (req.file) {
      // Delete old image if new one is uploaded
      if (slider.image) {
        deleteFile(slider.image);
      }
      // Set new image path
      updateData.image = `/uploads/${req.uploadFolder}/${req.file.filename}`;
    } else {
      // Keep old image if no new file is uploaded
      updateData.image = slider.image;
    }

    await slider.update(updateData);

    res.status(200).json({
      success: true,
      message: "Slider updated successfully",
      data: formatSliderData(slider),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 5. Delete Slider
exports.deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findByPk(req.params.id);
    if (!slider) {
      return res.status(404).json({ success: false, message: "Slider not found" });
    }

    // Delete image file from server storage
    if (slider.image) {
      deleteFile(slider.image);
    }

    await slider.destroy();
    res.status(200).json({
      success: true,
      message: "Slider and its image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};