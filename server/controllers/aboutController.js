const About = require("../models/About_models");
const fs = require("fs");
const path = require("path");
require("dotenv").config();


const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// ১. About ডেটা গেট করা
exports.getAbout = async (req, res) => {
    try {
        let about = await About.findOne();
        
        if (about) {
            about = about.toJSON();
            if (about.image) {
                about.image = `${BASE_URL}${about.image}`;
            }
        }

        res.status(200).json({ success: true, data: about });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ২. About 
exports.updateAbout = async (req, res) => {
    try {
        const { title, description, experience } = req.body;
        let about = await About.findOne();

        let relativePath = about ? about.image : "";

        if (req.file) {
            
            if (about && about.image) {
                const oldPath = path.join(__dirname, "..", about.image);
                if (fs.existsSync(oldPath)) {
                    try {
                        fs.unlinkSync(oldPath);
                    } catch (err) {
                        console.error("Old file delete error:", err);
                    }
                }
            }
            
            relativePath = `/uploads/${req.uploadFolder}/${req.file.filename}`;
        }

        if (about) {
            await about.update({ title, description, experience, image: relativePath });
        } else {
            about = await About.create({ title, description, experience, image: relativePath });
        }

        // ক্লায়েন্টকে পাঠানোর আগে ফুল URL তৈরি করুন
        const responseData = about.toJSON();
        if (responseData.image) {
            responseData.image = `${BASE_URL}${responseData.image}`;
        }

        res.status(200).json({ 
            success: true, 
            message: "About section updated!", 
            data: responseData 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};