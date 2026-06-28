const FAQ = require("../models/FAQ_models");

// 1. Create FAQ
exports.createFAQ = async (req, res) => {
    try {
        const { question, answer, status } = req.body;
        const newFAQ = await FAQ.create({ question, answer, status });
        res.status(201).json({ success: true, message: "FAQ created successfully", data: newFAQ });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. Get All FAQs
exports.getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json({ success: true, data: faqs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 3. Get Single FAQ
exports.getFAQById = async (req, res) => {
    try {
        const faq = await FAQ.findByPk(req.params.id);
        if (!faq) return res.status(404).json({ success: false, message: "FAQ not found" });
        res.status(200).json({ success: true, data: faq });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 4. Update FAQ
exports.updateFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByPk(req.params.id);
        if (!faq) return res.status(404).json({ success: false, message: "FAQ not found" });

        await faq.update(req.body);
        res.status(200).json({ success: true, message: "FAQ updated successfully", data: faq });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 5. Delete FAQ
exports.deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByPk(req.params.id);
        if (!faq) return res.status(404).json({ success: false, message: "FAQ not found" });

        await faq.destroy();
        res.status(200).json({ success: true, message: "FAQ deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};