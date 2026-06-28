const Destination = require('../models/Destination_models');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// --- ফাইল ডিলিট করার কমন ফাংশন ---
const deleteFile = (filePath) => {
    if (!filePath) return;
    // যদি ফুল URL থাকে, তবে শুধুমাত্র পাথটুকু আলাদা করে নেওয়া
    const relativePath = filePath.includes(BASE_URL) ? filePath.split(BASE_URL)[1] : filePath;
    // আপনার প্রজেক্ট স্ট্রাকচার অনুযায়ী পাথটি অ্যাডজাস্ট করুন (এখানে '..' দিয়ে রুট বোঝানো হয়েছে)
    const fullPath = path.join(__dirname, '..', relativePath);
    
    if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
            if (err) console.error("file delete error:", err);
            else console.log("file deleted:", relativePath);
        });
    }
};

// ইমেজ পাথকে ফুল URL-এ রূপান্তর করার হেল্পার ফাংশন
const formatData = (data) => {
    if (!data) return null;
    const item = data.toJSON();
    if (item.images && Array.isArray(item.images)) {
        item.images = item.images.map(img => 
            img.startsWith('http') ? img : `${BASE_URL}${img}`
        );
    }
    return item;
};

// ১. সব ডেস্টিনেশন পাওয়া
exports.getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll({ order: [['createdAt', 'DESC']] });
        const formatted = destinations.map(d => formatData(d));
        res.status(200).json({ success: true, data: formatted });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ২. আইডি দিয়ে নির্দিষ্ট ডেস্টিনেশন পাওয়া
exports.getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) {
            return res.status(404).json({ success: false, message: "Destination not found" });
        }
        res.status(200).json({ success: true, data: formatData(destination) });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}; 

// ৩. নতুন ডেস্টিনেশন তৈরি করা
exports.createDestination = async (req, res) => {
    try {
        const { title, location, price, rating, duration, description, highlights } = req.body;

        let imagePaths = [];
        if (req.files && req.files.length > 0) {
            const folder = req.uploadFolder || 'destinations'; 
            imagePaths = req.files.map(file => `/uploads/${folder}/${file.filename}`);
        }

        const newDestination = await Destination.create({
            title,
            location,
            price,
            rating: rating ? parseFloat(rating) : 0,
            duration,
            description,
            images: imagePaths,
            highlights: typeof highlights === 'string' ? JSON.parse(highlights) : highlights
        });

        res.status(201).json({ 
            success: true, 
            message: "Destination created successfully!", 
            data: formatData(newDestination) 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ৪. ডেস্টিনেশন আপডেট করা (deleteFile ফাংশনসহ)
exports.updateDestination = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) return res.status(404).json({ success: false, message: "Destination not found" });

        const updateData = { ...req.body };

        // highlights হ্যান্ডলিং
        if (updateData.highlights && typeof updateData.highlights === 'string') {
            updateData.highlights = JSON.parse(updateData.highlights);
        } 

        // ইমেজ আপডেট লজিক
        let finalImages = [];
        const oldImages = destination.images || [];

        // ফ্রন্টএন্ড থেকে আসা বিদ্যমান ইমেজ (যা রাখতে হবে)
        if (req.body.existingImages) {
            const existing = JSON.parse(req.body.existingImages);
            finalImages = existing.map(img => img.includes(BASE_URL) ? img.split(BASE_URL)[1] : img);
        }

        // নতুন আপলোড করা ইমেজ যোগ করা
        if (req.files && req.files.length > 0) {
            const folder = req.uploadFolder || 'destinations';
            const newPaths = req.files.map(file => `/uploads/${folder}/${file.filename}`);
            finalImages = [...finalImages, ...newPaths];
        }

        // *** এখানে আপনার deleteFile ফাংশনটি ব্যবহার করা হয়েছে ***
        oldImages.forEach(oldPath => {
            if (!finalImages.includes(oldPath)) {
                deleteFile(oldPath); // এটি অটোমেটিক ফাইলটি ফোল্ডার থেকে মুছে দেবে
            }
        });

        updateData.images = finalImages;

        await destination.update(updateData);
        res.status(200).json({ 
            success: true, 
            message: "Destination updated successfully!", 
            data: formatData(destination) 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ৫. ডেস্টিনেশন ডিলিট করা
exports.deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) return res.status(404).json({ success: false, message: "Destination not found" });

        // সব ইমেজ ডিলিট করার জন্য deleteFile ফাংশন ব্যবহার
        if (destination.images && Array.isArray(destination.images)) {
            destination.images.forEach(img => deleteFile(img));
        }

        await destination.destroy();
        res.status(200).json({ success: true, message: "Destination deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};