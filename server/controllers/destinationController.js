const Destination = require('../models/Destination_models');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// --- ফাইল ডিলিট করার কমন ফাংশন ---
const deleteFile = (filePath) => {
    if (!filePath) return;
    const relativePath = filePath.includes(BASE_URL) ? filePath.split(BASE_URL)[1] : filePath;
    const fullPath = path.join(__dirname, '..', relativePath);
    
    if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
            if (err) console.error("file delete error:", err);
            else console.log("file deleted:", relativePath);
        });
    }
};

// ডাটা ফরম্যাটিং ফাংশন
const formatData = (data) => {
    if (!data) return null;
    const item = data.toJSON();

    if (item.highlights && typeof item.highlights === 'string') {
        try {
            item.highlights = JSON.parse(item.highlights);
        } catch (e) {
            console.error("Error parsing highlights field:", e);
            item.highlights = []; 
        }
    }

    if (item.requirements && typeof item.requirements === 'string') {
        try {
            item.requirements = JSON.parse(item.requirements);
        } catch (e) {
            console.error("Error parsing requirements field:", e);
            item.requirements = [];
        }
    }

    if (item.images && typeof item.images === 'string') {
        try {
            item.images = JSON.parse(item.images);
        } catch (e) {
            console.error("Error parsing images field:", e);
            item.images = []; 
        }
    }

    if (item.images && Array.isArray(item.images)) {
        item.images = item.images
            .filter(img => img !== null && img !== undefined && img !== "")
            .map(img => img.startsWith('http') ? img : `${BASE_URL}${img}`);
    } else {
        item.images = []; 
    }

    return item;
};

// ১. সব ডেস্টিনেশন পাওয়া
exports.getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll({ order: [['createdAt', 'DESC']] });
        const formatted = destinations.map(d => formatData(d));
        res.status(200).json({ success: true, data: formatted });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ২. আইডি দিয়ে নির্দিষ্ট ডেস্টিনেশন পাওয়া
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

// ৪. ডেস্টিনেশন আপডেট করা
exports.updateDestination = async (req, res) => {
    try {
        const id = req.params.id;
        const destination = await Destination.findByPk(id);
        if (!destination) return res.status(404).json({ success: false, message: "Destination not found" });

        // ১. বডি অবজেক্ট ক্লিন ফিল্টারিং (extra fields বাদ দেওয়ার জন্য)
        const updateData = {
            title: req.body.title,
            location: req.body.location,
            price: req.body.price,
            duration: req.body.duration,
            description: req.body.description
        };

        if (req.body.rating) updateData.rating = parseFloat(req.body.rating);

        // highlights সেফ হ্যান্ডলিং
        let finalHighlights = [];
        if (req.body.highlights) {
            try {
                finalHighlights = typeof req.body.highlights === 'string'
                    ? JSON.parse(req.body.highlights)
                    : req.body.highlights;
            } catch (e) {
                if (typeof req.body.highlights === 'string') {
                    finalHighlights = req.body.highlights.split(',').map(h => h.trim());
                }
            }
        }
        updateData.highlights = finalHighlights;

        // ২. ইমেজ আপডেট লজিক
        let finalImages = [];
        let checkExisting = false;

        // ফ্রন্টএন্ড থেকে আসা বিদ্যমান ইমেজ (যা রাখতে হবে)
        if (req.body.existingImages) {
            try {
                const existing = typeof req.body.existingImages === 'string'
                    ? JSON.parse(req.body.existingImages)
                    : req.body.existingImages;

                if (Array.isArray(existing)) {
                    checkExisting = true;
                    finalImages = existing.map(img => img.includes(BASE_URL) ? img.split(BASE_URL)[1] : img);
                }
            } catch (e) {
                console.error("Existing images parsing error:", e);
            }
        }

        // নতুন আপলোড করা ইমেজ যোগ করা
        const hasNewFiles = req.files && req.files.length > 0;
        if (hasNewFiles) {
            const folder = req.uploadFolder || 'destinations';
            const newPaths = req.files.map(file => `/uploads/${folder}/${file.filename}`);
            finalImages = [...finalImages, ...newPaths];
        }

        // ৩. পুরোনো ফাইল ডিলিট করার সেফটি লজিক
        let oldImages = destination.getDataValue("images") || [];
        if (typeof oldImages === 'string') {
            try { oldImages = JSON.parse(oldImages); } catch (e) { oldImages = []; }
        }

        if (checkExisting || hasNewFiles) {
            if (Array.isArray(oldImages)) {
                oldImages.forEach(oldPath => {
                    if (!finalImages.includes(oldPath)) {
                        deleteFile(oldPath); 
                    }
                });
            }
            updateData.images = finalImages; // সিকুয়েলাইজ মডেলের জন্য পিওর অ্যারে পাস
        } else {
            // যদি ফ্রন্টএন্ড থেকে কোনো ছবির মডিফিকেশন ডাটা না আসে
            updateData.images = Array.isArray(oldImages) ? oldImages : [];
        }

        // ৪. ডাটাবেজ আপডেট ও ফ্রেশ ডাটা রিটার্ন
        await destination.update(updateData);
        
        const updatedDestination = await Destination.findByPk(id);
        res.status(200).json({ 
            success: true, 
            message: "Destination updated successfully!", 
            data: formatData(updatedDestination) 
        });
    } catch (error) {
        console.error("Update Destination Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ৫. ডেস্টিনেশন ডিলিট করা
exports.deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) return res.status(404).json({ success: false, message: "Destination not found" });

        // সব ইমেজ পার্স করে ডিলিট করা (স্ট্রিং/অ্যারে সেফটি ফিক্স)
        let imagesToDelete = destination.getDataValue("images") || [];
        if (typeof imagesToDelete === "string") {
            try { imagesToDelete = JSON.parse(imagesToDelete); } catch(e) { imagesToDelete = []; }
        }

        if (Array.isArray(imagesToDelete) && imagesToDelete.length > 0) {
            imagesToDelete.forEach(img => deleteFile(img));
        }

        await destination.destroy();
        res.status(200).json({ success: true, message: "Destination deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};