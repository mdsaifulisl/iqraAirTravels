const Setting = require('../models/Setting_modelsOne');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// ১. সেটিংস ডাটা গেট করা
// settingController.js

// ১. সেটিংস গেট করার সময় ফেভিকন URL যোগ করুন
exports.getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create({
                siteName: "Travel Admin",
                siteEmail: "info@travelagency.com"
            });
        }

        let settingsData = settings.toJSON();
        // লোগো URL
        if (settingsData.siteLogo) {
            settingsData.siteLogo = `${BASE_URL}${settingsData.siteLogo}`;
        }
        // ফেভিকন URL (নতুন)
        if (settingsData.siteFavicon) {
            settingsData.siteFavicon = `${BASE_URL}${settingsData.siteFavicon}`;
        }

        res.status(200).json({ success: true, data: settingsData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ২. আপডেট ফাংশন (প্রধান পরিবর্তন এখানে)
exports.updateSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();
        const folder = req.uploadFolder || "Site_Settings";
        const updateData = { ...req.body };

        // Boolean কনভার্ট করা (যেহেতু FormData থেকে স্ট্রিং আসে)
        updateData.maintenanceMode = req.body.maintenanceMode === 'true' || req.body.maintenanceMode === true;

        // ফাইল হ্যান্ডলিং (siteLogo এবং siteFavicon)
        if (req.files) {
            // ১. সাইট লোগো প্রসেস করা
            if (req.files['siteLogo']) {
                const logoFile = req.files['siteLogo'][0];
                // আগের লোগো ডিলিট করা (অপশনাল)
                if (settings && settings.siteLogo) {
                    const oldLogoPath = path.join(__dirname, '..', settings.siteLogo);
                    if (fs.existsSync(oldLogoPath)) fs.unlinkSync(oldLogoPath);
                }
                updateData.siteLogo = `/uploads/${folder}/${logoFile.filename}`;
            }

            // ২. সাইট ফেভিকন প্রসেস করা
            if (req.files['siteFavicon']) {
                const faviconFile = req.files['siteFavicon'][0];
                // আগের ফেভিকন ডিলিট করা
                if (settings && settings.siteFavicon) {
                    const oldFavPath = path.join(__dirname, '..', settings.siteFavicon);
                    if (fs.existsSync(oldFavPath)) fs.unlinkSync(oldFavPath);
                }
                updateData.siteFavicon = `/uploads/${folder}/${faviconFile.filename}`;
            }
        }

        if (settings) {
            await settings.update(updateData);
        } else {
            settings = await Setting.create(updateData);
        }

        // রিটার্ন করার সময় ফুল URL পাঠানো
        let updatedResult = settings.toJSON();
        if (updatedResult.siteLogo) updatedResult.siteLogo = `${BASE_URL}${updatedResult.siteLogo}`;
        if (updatedResult.siteFavicon) updatedResult.siteFavicon = `${BASE_URL}${updatedResult.siteFavicon}`;

        res.status(200).json({ 
            success: true, 
            message: "update successfully", 
            data: updatedResult 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "update failed", error: error.message });
    }
};