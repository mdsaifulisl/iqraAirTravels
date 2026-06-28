const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require('../middleware/authMiddleware');

// ১. পাবলিক রাউট (লগইন করার জন্য কোনো টোকেন লাগে না)
router.post('/login', userController.loginUser);


// ২. প্রটেক্টেড রাউটস (নিচের সব রাউটের জন্য এখন টোকেন বাধ্যতামূলক)
// এই লাইনের পর থেকে সব রাউট protect মিডলওয়্যার দিয়ে যাবে
router.use(protect); 
router.put("/change-password", userController.changePassword);
router.get("/verify-me", userController.getMe);
const setUserFolder = (req, res, next) => {
  req.uploadFolder = "User_Image";
  next();
};

router.post(
  "/",
  setUserFolder,
  upload.single("image"),
  userController.createUser
);

router.put(
  "/:id",
  setUserFolder,
  upload.single("image"),
  userController.updateUser
);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

module.exports = router;