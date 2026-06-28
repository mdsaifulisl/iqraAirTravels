const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require('../middleware/authMiddleware');

// fulder setup middleware
const setDestinationFolder = (req, res, next) => {
  req.uploadFolder = "Destination_Image";
  next();
};

router.get("/", destinationController.getAllDestinations);
router.get("/:id", destinationController.getDestinationById);
router.use(protect);
router.post("/", setDestinationFolder, upload.array("images", 10), destinationController.createDestination,);
router.put("/:id", setDestinationFolder, upload.array("images", 10), destinationController.updateDestination,);
router.delete("/:id", destinationController.deleteDestination);

module.exports = router;
