const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");
const { protect } = require('../middleware/authMiddleware');


router.get("/", faqController.getAllFAQs);
router.get("/:id", faqController.getFAQById);
router.use(protect);
router.post("/", faqController.createFAQ);
router.put("/:id", faqController.updateFAQ);
router.delete("/:id", faqController.deleteFAQ);

module.exports = router;