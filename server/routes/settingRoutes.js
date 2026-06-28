const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const upload = require("../middleware/uploadMiddleware");
const { protect } = require('../middleware/authMiddleware');

const setSettingsFolder = (req, res, next) => {
    req.uploadFolder = 'Site_Settings'; 
    next();
}


router.get('/', settingController.getSettings);


// router.js
router.put(
  '/update', 
  protect, 
  setSettingsFolder, 
  upload.fields([
    { name: 'siteLogo', maxCount: 1 },
    { name: 'siteFavicon', maxCount: 1 }
  ]),
  settingController.updateSettings
);

// router.put('/update', protect, setSettingsFolder, upload.single('siteLogo'), settingController.updateSettings);

module.exports = router;







