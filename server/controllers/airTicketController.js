const AirTicket = require('../models/AirTicket_models');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// ১. ফাইল ডিলিট করার হেল্পার ফাংশন (আপনার ট্যুর কন্ট্রোলার স্টাইলে)
const deleteFile = (filePath) => {
    if (!filePath) return;
    
    const relativePath = filePath.includes(BASE_URL)
        ? filePath.split(BASE_URL)[1]
        : filePath;
    const fullPath = path.join(__dirname, "..", relativePath);

    if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
            if (err) console.error("ফাইল ডিলিট করতে সমস্যা:", err);
        });
    }
};

// ২. ডাটা ফরম্যাটিং ফাংশন (ফ্রন্টএন্ডে ফুল URL পাঠানোর জন্য)
const formatTicketData = (ticket) => {
    const ticketData = ticket.toJSON();
    if (ticketData.image) {
        ticketData.image = ticketData.image.startsWith("http") 
            ? ticketData.image 
            : `${BASE_URL}${ticketData.image}`;
    }
    return ticketData;
};

// ৩. নতুন টিকেট তৈরি (Create)
exports.createTicket = async (req, res) => {
    try {
        const { from, to, airline, price, type, description } = req.body;
        console.log(req.body);

        let imagePath = null;
        if (req.file) {
            imagePath = `/uploads/${req.uploadFolder}/${req.file.filename}`;
        }

        const newTicket = await AirTicket.create({
            from,
            to,
            airline,
            price,
            trip_type: type,
            image: imagePath,
            description
        });

        res.status(201).json({
            success: true,
            message: "এয়ার টিকেট সফলভাবে তৈরি হয়েছে!",
            data: formatTicketData(newTicket)
        });
    } catch (error) {
        if (req.file) deleteFile(`/uploads/${req.uploadFolder}/${req.file.filename}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ৪. সব টিকেট পাওয়া (Get All)
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await AirTicket.findAll({ order: [["createdAt", "DESC"]] });
        const formattedTickets = tickets.map(ticket => formatTicketData(ticket));
        res.status(200).json({ success: true, data: formattedTickets });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ৫. আইডি দিয়ে টিকেট পাওয়া (Get One)
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await AirTicket.findByPk(req.params.id);
        if (!ticket) return res.status(404).json({ success: false, message: "টিকেট পাওয়া যায়নি" });
        res.status(200).json({ success: true, data: formatTicketData(ticket) });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ৬. টিকেট আপডেট করা (Update)
exports.updateTicket = async (req, res) => {
    try {
        const ticket = await AirTicket.findByPk(req.params.id);
        if (!ticket) return res.status(404).json({ success: false, message: "টিকেট পাওয়া যায়নি" });

        const updateData = { ...req.body };
        
        // ইমেজ হ্যান্ডলিং
        let finalImage = ticket.getDataValue("image"); // ডিফল্ট আগেরটা

        if (req.file) {
            // নতুন ইমেজ আসলে পুরনো ফাইল ডিলিট
            if (finalImage) deleteFile(finalImage);
            finalImage = `/uploads/${req.uploadFolder}/${req.file.filename}`;
        } else if (req.body.image === "" || req.body.image === null) {
            // যদি ফ্রন্টএন্ড থেকে ইমেজ রিমুভ করে দেয়
            if (finalImage) deleteFile(finalImage);
            finalImage = null;
        }

        updateData.image = finalImage;

        await ticket.update(updateData);

        res.status(200).json({
            success: true,
            message: "ticket updated successfully",
            data: formatTicketData(ticket)
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ৭. টিকেট ডিলিট করা (Delete)
exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await AirTicket.findByPk(req.params.id);
        if (!ticket) return res.status(404).json({ success: false, message: "টিকেট পাওয়া যায়নি" });

        // ফাইল ডিলিট
        const imageToDelete = ticket.getDataValue("image");
        if (imageToDelete) deleteFile(imageToDelete);

        await ticket.destroy();
        res.status(200).json({ success: true, message: "টিকেট এবং ছবি ডিলিট করা হয়েছে" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};