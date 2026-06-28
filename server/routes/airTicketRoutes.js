const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/airTicketController');
const upload = require("../middleware/uploadMiddleware");
const { protect } = require('../middleware/authMiddleware');
const setAirTicketFolder = (req, res, next) => {
    req.uploadFolder = 'AirTicket_Image';
    next();
}

router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);

router.use(protect);
router.post('/', setAirTicketFolder, upload.single('image'), ticketController.createTicket);
router.put('/:id', setAirTicketFolder, upload.single('image'), ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);

module.exports = router; 