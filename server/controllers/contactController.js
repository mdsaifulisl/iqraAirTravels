const Contact = require("../models/Contact_models");

// HTML tag stripping function for security
const sanitizeInput = (str) => {
  if (typeof str !== "string") return str;
  return str.replace(/<[^>]*>?/gm, "").trim();
};

// 1. Message Create (Public)
exports.createContact = async (req, res) => {
  try {
    let { name, email, phone, message } = req.body;

    // Data Sanitization
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    phone = sanitizeInput(phone);
    message = sanitizeInput(message);

    // Required Fields Validation
    if (!name || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields (Name, Phone, Message)" 
      });
    }

    // Length Checks
    if (name.length > 50) {
      return res.status(400).json({ success: false, message: "Name must be within 50 characters" });
    }
    if (phone.length > 15) {
      return res.status(400).json({ success: false, message: "Phone number is too long" });
    }
    if (message.length > 500) {
      return res.status(400).json({ success: false, message: "Message must be within 500 characters" });
    }

    // Email Format Validation (if provided)
    let finalEmail = "N/A";
    if (email && email !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) || email.length > 80) {
        return res.status(400).json({ success: false, message: "Please provide a valid email address" });
      }
      finalEmail = email;
    }

    // Create Database Entry
    const newContact = await Contact.create({
      name,
      email: finalEmail,
      phone,
      message,
      status: 'unread'
    });

    res.status(201).json({
      success: true,
      message: "Message received successfully. Thank you!",
      data: newContact
    });

  } catch (error) {
    console.error("Create Contact Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
}; 

// 2. All Messages Get (Admin)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Message Status Update
exports.updateStatus = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    const { status } = req.body;
    const allowedStatuses = ['read', 'unread', 'replied'];
    const updatedStatus = allowedStatuses.includes(status) ? status : 'read';

    await contact.update({ status: updatedStatus });
    res.status(200).json({ success: true, message: "Status updated successfully", data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. Message Delete
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    await contact.destroy();
    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};