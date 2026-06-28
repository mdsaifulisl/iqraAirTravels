const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/sliderController");
const upload = require("../middleware/uploadMiddleware"); 
const { protect } = require('../middleware/authMiddleware');

const setSliderFolder = (req, res, next) => {
    req.uploadFolder = 'Slider_Image'; 
    next();
};

router.get("/", sliderController.getAllSliders);
router.get("/:id", sliderController.getSliderById);

router.use(protect);
router.post("/", setSliderFolder, upload.single("image"), sliderController.createSlider);
router.put("/:id", setSliderFolder, upload.single("image"), sliderController.updateSlider);
router.delete("/:id", sliderController.deleteSlider);

module.exports = router;
