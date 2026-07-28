const Booking = require("../models/Booking");
const BookingDocument = require("../models/BookingDocument");
const { sequelize } = require("../config/db");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// ১. সেফ অসিঙ্ক্রোনাস ফাইল ডিলিট
const deleteFile = (filePath) => {
  if (!filePath) return;
  try {
    let relativePath = filePath;
    if (filePath.includes("http://") || filePath.includes("https://")) {
      const url = new URL(filePath);
      relativePath = url.pathname;
    }
    const fullPath = path.join(__dirname, "..", relativePath);

    if (fs.existsSync(fullPath)) {
      fs.unlink(fullPath, (err) => {
        if (err) console.error("File delete error:", err.message);
      });
    }
  } catch (err) {
    console.error("File parsing error:", err.message);
  }
};

// ২. ডাটা ফরম্যাটিং হেলপার
const formatBookingData = (booking) => {
  if (!booking) return null;
  const bookingData = typeof booking.toJSON === "function" ? booking.toJSON() : booking;

  if (bookingData.documents && Array.isArray(bookingData.documents)) {
    bookingData.documents = bookingData.documents.map((doc) => {
      const rawPath = doc.filePath || "";
      const cleanPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
      
      return {
        ...doc,
        filePath: rawPath.startsWith("http")
          ? rawPath
          : `${BASE_URL.replace(/\/$/, "")}${cleanPath}`,
      };
    });
  } else {
    bookingData.documents = [];
  }

  return bookingData;
};

// -------------------------------------------------------------
// CONTROLLER METHODS
// -------------------------------------------------------------

// ১. নতুন বুকিং তৈরি (Mobile Optimized & Robust)
exports.createBooking = async (req, res) => {
  const t = await sequelize.transaction();
  let uploadedFiles = req.files || [];

  try {
    const {
      bookingType,
      itemId,
      fullName,
      phone,
      email,
      address,
      specialRequest,
    } = req.body;

    // ভ্যালিডেশন
    if (!fullName || !phone || !address || !itemId) {
      await t.rollback();
      // মোবাইল ফাইল ক্লিনআপ
      uploadedFiles.forEach((file) => deleteFile(file.path));

      return res.status(400).json({
        success: false,
        message: "সব প্রয়োজনীয় তথ্য প্রদান করুন (fullName, phone, address, itemId)",
      });
    }

    // মূল বুকিং ক্রিয়েট
    const newBooking = await Booking.create(
      {
        bookingType: bookingType || "tour",
        itemId: itemId, // String/Number অটো হ্যান্ডেল হবে
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : null,
        address: address.trim(),
        specialRequest: specialRequest ? specialRequest.trim() : null,
      },
      { transaction: t }
    );

    let documentRecords = [];

    // ফাইল প্রসেসিং
    if (uploadedFiles.length > 0) {
      let labels = req.body.documentLabels;

      // Safe Label Parsing for Mobile Form-Data
      if (typeof labels === "string") {
        try {
          labels = JSON.parse(labels);
        } catch {
          labels = [labels];
        }
      }

      const folder = req.uploadFolder || "Booking_Documents";
      
      documentRecords = uploadedFiles.map((file, index) => {
        let label = "Document";
        if (Array.isArray(labels)) {
          label = labels[index] || labels[0] || "Document";
        } else if (typeof labels === "string") {
          label = labels;
        }

        return {
          bookingId: newBooking.id,
          filePath: `/uploads/${folder}/${file.filename}`,
          label: label,
        };
      });

      // ডক ক্রিয়েট
      await BookingDocument.bulkCreate(documentRecords, { transaction: t });
    }

    // ট্রানজ্যাকশন কমিট
    await t.commit();

    // এক্সট্রা ডাটাবেজ কোয়েরি এড়াতে ম্যানুয়ালি রেসপন্স অবজেক্ট তৈরি
    const responseData = newBooking.toJSON();
    responseData.documents = documentRecords;

    return res.status(201).json({
      success: true,
      message: "আপনার বুকিং অনুরোধটি সফলভাবে গৃহীত হয়েছে! খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।",
      data: formatBookingData(responseData),
    });

  } catch (error) {
    await t.rollback();

    // এরর হলে আপলোড হওয়া ফাইলগুলো ক্লিনআপ
    if (uploadedFiles.length > 0) {
      const folder = req.uploadFolder || "Booking_Documents";
      uploadedFiles.forEach((file) => {
        deleteFile(`/uploads/${folder}/${file.filename}`);
      });
    }

    console.error("Create Booking Error:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || "বুকিং তৈরি করতে সমস্যা হয়েছে" 
    });
  }
};

// ২. সব বুকিং পাওয়া
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: BookingDocument, as: "documents" }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: bookings.map((b) => formatBookingData(b)),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৩. ID দিয়ে একক বুকিং পাওয়া
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [{ model: BookingDocument, as: "documents" }],
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "বুকিং পাওয়া যায়নি" });
    }

    res.status(200).json({ success: true, data: formatBookingData(booking) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৪. বুকিং ও ডকুমেন্টস আপডেট
exports.updateBooking = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, {
      include: [{ model: BookingDocument, as: "documents" }],
    });

    if (!booking) {
      await t.rollback();
      return res.status(404).json({ success: false, message: "বুকিং পাওয়া যায়নি" });
    }

    const updateFields = {
      bookingType: req.body.bookingType || booking.bookingType,
      itemId: req.body.itemId || booking.itemId,
      fullName: req.body.fullName || booking.fullName,
      phone: req.body.phone || booking.phone,
      email: req.body.email !== undefined ? req.body.email : booking.email,
      address: req.body.address || booking.address,
      specialRequest:
        req.body.specialRequest !== undefined
          ? req.body.specialRequest
          : booking.specialRequest,
      status: req.body.status || booking.status,
    };

    let existingDocIds = [];
    if (req.body.existingDocIds) {
      try {
        existingDocIds = typeof req.body.existingDocIds === "string"
          ? JSON.parse(req.body.existingDocIds)
          : req.body.existingDocIds;
      } catch {
        existingDocIds = Array.isArray(req.body.existingDocIds) ? req.body.existingDocIds : [req.body.existingDocIds];
      }
    }

    if (booking.documents && booking.documents.length > 0) {
      for (const doc of booking.documents) {
        if (!existingDocIds.includes(doc.id)) {
          deleteFile(doc.filePath);
          await doc.destroy({ transaction: t });
        }
      }
    }

    if (req.files && req.files.length > 0) {
      const folder = req.uploadFolder || "Booking_Documents";
      let labels = req.body.documentLabels;
      if (typeof labels === "string") {
        try {
          labels = JSON.parse(labels);
        } catch {
          labels = [labels];
        }
      }

      const newDocs = req.files.map((file, index) => {
        const label = Array.isArray(labels) ? labels[index] : labels;
        return {
          bookingId: id,
          filePath: `/uploads/${folder}/${file.filename}`,
          label: label || "Document",
        };
      });

      await BookingDocument.bulkCreate(newDocs, { transaction: t });
    }

    await booking.update(updateFields, { transaction: t });
    await t.commit();

    const updatedBooking = await Booking.findByPk(id, {
      include: [{ model: BookingDocument, as: "documents" }],
    });

    res.status(200).json({
      success: true,
      message: "বুকিং তথ্য সফলভাবে আপডেট হয়েছে",
      data: formatBookingData(updatedBooking),
    });
  } catch (error) {
    await t.rollback();
    console.error("Update Booking Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৫. স্ট্যাটাস আপডেট
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "বুকিং পাওয়া যায়নি" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `স্ট্যাটাস সফলভাবে ${status}-এ পরিবর্তন করা হয়েছে`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৬. বুকিং ডিলিট
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [{ model: BookingDocument, as: "documents" }],
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "বুকিং পাওয়া যায়নি" });
    }

    if (booking.documents && booking.documents.length > 0) {
      booking.documents.forEach((doc) => deleteFile(doc.filePath));
    }

    await booking.destroy();

    res.status(200).json({
      success: true,
      message: "বুকিং এবং সংশ্লিষ্ট ফাইল সফলভাবে ডিলিট করা হয়েছে",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// message: "আপনার বুকিং অনুরোধটি সফলভাবে গৃহীত হয়েছে! খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।",
