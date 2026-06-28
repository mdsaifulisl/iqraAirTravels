const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController'); 
const upload = require("../middleware/uploadMiddleware");
const { protect } = require('../middleware/authMiddleware');

const setBlogFolder = (req, res, next) => {
    req.uploadFolder = 'Blog_Images';
    next();
}

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.use(protect);
router.post('/', setBlogFolder, upload.array('images', 10), blogController.createBlog);
router.put('/:id', setBlogFolder, upload.array('images', 10), blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;