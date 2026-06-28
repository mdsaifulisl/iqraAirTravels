const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');


const setTourFolder = (req, res, next) => {
    req.uploadFolder = 'Tour_Image'; 
    next();
};

router.get('/', tourController.getAllTours);
router.get('/:id', tourController.getTourById);
router.use(protect);
router.post('/', setTourFolder, upload.array('images', 10), tourController.createTour);
router.put('/:id', setTourFolder, upload.array('images', 10), tourController.updateTour);
router.delete('/:id', tourController.deleteTour);
 
module.exports = router; 