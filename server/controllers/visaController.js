const Visa = require("../models/Visa_models");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// --- হেল্পার ফাংশন: ফাইল ডিলিট করা ---
const deleteFile = (filePath) => {
  if (!filePath) return;
  // যদি ফুল URL থাকে তবে শুধু পাথটুকু নেওয়া
  const relativePath = filePath.includes(BASE_URL)
    ? filePath.split(BASE_URL)[1]
    : filePath;
  
  const fullPath = path.join(__dirname, "..", relativePath);

  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) console.error("File delete error:", err);
      else console.log("File deleted from server:", relativePath);
    });
  }
};

// --- হেল্পার ফাংশন: ডাটা ফরম্যাট করা (Front-end এ পাঠানোর জন্য) ---
const formatData = (data) => {
  if (!data) return null;
  const item = data.toJSON();

  // Requirements parsing
  if (item.requirements && typeof item.requirements === 'string') {
    try {
      item.requirements = JSON.parse(item.requirements);
    } catch (e) {
      item.requirements = [];
    }
  }

  // Image URL mapping
  if (item.images && Array.isArray(item.images)) {
    item.images = item.images
      .filter(img => img !== null)
      .map((img) => (img.startsWith("http") ? img : `${BASE_URL}${img}`));
  } else {
    item.images = [];
  }
  return item;
};

// ১. সকল ভিসা দেখা
exports.getAllVisas = async (req, res) => {
  try {
    const visas = await Visa.findAll({
      order: [['createdAt', 'DESC']]
    });

    const formattedData = visas.map(visa => formatData(visa));

    res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData
    });
  } catch (error) {
    console.error("Get All Visas Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ২. সিঙ্গেল ভিসা দেখা
exports.getVisaById = async (req, res) => {
  try {
    const visa = await Visa.findByPk(req.params.id);
    if (!visa) return res.status(404).json({ success: false, message: "Visa not found" });
    
    res.status(200).json({ success: true, data: formatData(visa) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৩. নতুন ভিসা তৈরি
exports.createVisa = async (req, res) => {
  try {
    const updateData = { ...req.body };
    const folder = req.uploadFolder || "Visa_Image";

    // Requirements হ্যান্ডলিং
    if (updateData.requirements && typeof updateData.requirements === "string") {
      updateData.requirements = JSON.parse(updateData.requirements);
    }

    // ইমেজ পাথ সেভ করা
    const images = req.files
      ? req.files.map((file) => `/uploads/${folder}/${file.filename}`)
      : [];

    const newVisa = await Visa.create({ ...updateData, images });

    res.status(201).json({
      success: true,
      message: "Visa created successfully!",
      data: formatData(newVisa),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৪. ভিসা আপডেট (FIXED)
// --- আপডেট ভিসা কন্ট্রোলার ---
exports.updateVisa = async (req, res) => {
  
  
  try {
    const visa = await Visa.findByPk(req.params.id);
    if (!visa) {
      return res.status(404).json({ success: false, message: "Visa not found" });
    }

    const updateData = { ...req.body };

    // ১. Description হ্যান্ডলিং (Sequelize Array Error সমাধান)
    if (Array.isArray(updateData.description)) {
      updateData.description = updateData.description[0];
    }

    // ২. Requirements ক্লিনআপ
    if (updateData.requirements) {
      if (typeof updateData.requirements === "string") {
        updateData.requirements = JSON.parse(updateData.requirements);
      }
      if (Array.isArray(updateData.requirements)) {
        updateData.requirements = updateData.requirements.map(item => {
          try {
            // যদি ভুল করে ডাবল কোটেশন বা অ্যারো স্ট্রিং আসে
            return (typeof item === "string" && item.startsWith("[")) ? JSON.parse(item)[0] : item;
          } catch (e) { return item; }
        });
      }
    }

    // ৩. ইমেজ ম্যানেজমেন্ট (রাখা, ডিলিট এবং নতুন অ্যাড)
    let finalImages = [];

    // ফ্রন্টএন্ড থেকে আসা existingImages (যেগুলো ইউজার ডিলিট করেনি)
    if (updateData.existingImages) {
      let parsedExisting = [];
      try {
        parsedExisting = typeof updateData.existingImages === "string" 
          ? JSON.parse(updateData.existingImages) 
          : updateData.existingImages;
      } catch (e) {
        parsedExisting = [];
      }
      
      if (Array.isArray(parsedExisting)) {
        finalImages = parsedExisting
          .filter(img => img && typeof img === 'string') // null চেক
          .map(img => {
            // যদি ফুল URL আসে (http://...), তবে শুধু পাথটুকু নিবে (/uploads/...)
            if (img.includes(BASE_URL)) {
              return img.split(BASE_URL)[1];
            }
            return img;
          });
      }
    }

    // সার্ভার থেকে সেই ছবিগুলোই ডিলিট হবে যেগুলো finalImages লিস্টে নেই
    if (visa.images && Array.isArray(visa.images)) {
      visa.images.forEach(img => {
        if (img && !finalImages.includes(img)) {
          deleteFile(img); 
        }
      });
    }

    // নতুন আপলোড করা ছবিগুলো যোগ করা
    if (req.files && req.files.length > 0) {
      const folder = req.uploadFolder || "Visa_Image";
      const newImages = req.files.map((file) => `/uploads/${folder}/${file.filename}`);
      finalImages = [...finalImages, ...newImages];
    }

    // ডাটাবেজ কলামে ফাইনাল অ্যারো সেট করা
    updateData.images = finalImages;
    
    // existingImages প্রপার্টি ডাটাবেজ মডেলে নেই, তাই এটি ডিলিট করা জরুরি
    delete updateData.existingImages;

    // ৪. ডাটাবেজ আপডেট
    await visa.update(updateData);

    res.status(200).json({
      success: true,
      message: "Visa updated successfully!",
      data: formatData(visa),
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৫. ভিসা ডিলিট
exports.deleteVisa = async (req, res) => {
  try {
    const visa = await Visa.findByPk(req.params.id);
    if (!visa) return res.status(404).json({ success: false, message: "Visa not found" });

    if (visa.images && visa.images.length > 0) {
      visa.images.forEach((img) => deleteFile(img));
    }

    await visa.destroy();
    res.status(200).json({ success: true, message: "Visa deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};