const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require('../middleware/authMiddleware');

const setAboutFolder = (req, res, next) => {
    req.uploadFolder = 'About_Image';
    next();
};

router.get("/", aboutController.getAbout);
router.put("/", protect, setAboutFolder, upload.single("image"), aboutController.updateAbout);

module.exports = router;