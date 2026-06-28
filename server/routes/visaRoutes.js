const express = require('express');
const router = express.Router();
const visaController = require('../controllers/visaController');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// ইমেজ ফোল্ডারের নাম সেট করার জন্য একটি ছোট মিডলওয়্যার
const setVisaFolder = (req, res, next) => {
    req.uploadFolder = 'Visa_Image'; 
    next();
};
 

router.get('/', visaController.getAllVisas);
router.get('/:id', visaController.getVisaById);

router.use(protect);
router.post('/', setVisaFolder, upload.array('images', 10), visaController.createVisa);
router.put('/:id', setVisaFolder, upload.array('images', 10), visaController.updateVisa);
router.delete('/:id', visaController.deleteVisa);

module.exports = router;