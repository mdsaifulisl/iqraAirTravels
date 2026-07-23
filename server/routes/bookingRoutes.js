const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// আপলোড ফোল্ডারের নাম সেট করার জন্য মিডলওয়্যার
const setBookingFolder = (req, res, next) => {
    req.uploadFolder = 'Booking_Documents';
    next();
};

// ১. পাবলিক রাউট (যেকেউ বুকিং ফর্ম সাবমিট করতে পারবে)
router.post('/', setBookingFolder, upload.array('documents', 5), bookingController.createBooking);

// ২. প্রোটেক্টেড রাউটসমূহ (এডমিন/অথরাইজড ইউজারদের জন্য)
router.use(protect);

router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', setBookingFolder, upload.array('documents', 5), bookingController.updateBooking);
router.patch('/:id/status', bookingController.updateBookingStatus);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;

