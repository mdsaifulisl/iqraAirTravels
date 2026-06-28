const Contact = require("../models/Contact_models");

// message create (Public)
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // 1. Validation check
    // Name, phone, and message are mandatory; email is optional.
    if (!name || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields (Name, Phone, Message)" 
      });
    }

    // 2. Set "N/A" if email is empty or only whitespace
    const finalEmail = email && email.trim() !== "" ? email : "N/A";

    // 3. Create database entry
    const newContact = await Contact.create({
      name,
      email: finalEmail,
      phone,
      message,
      status: 'unread'
    });

    // 4. Success response
    res.status(201).json({
      success: true,
      message: "Message received successfully. Thank you!",
      data: newContact
    });

  } catch (error) {
    // 5. Error handling and logging
    console.error("Create Contact Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
}; 

// all messages get (Admin)
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

// message status update 
exports.updateStatus = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "massage not found" });
    }

    await contact.update({ status: req.body.status || 'read' });
    res.status(200).json({ success: true, message: "Status Updated", data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// message delete
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "massage not found" });
    }

    await contact.destroy();
    res.status(200).json({ success: true, message: "massage deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};