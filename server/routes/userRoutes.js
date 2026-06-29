/*
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
*/



const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require('../middleware/authMiddleware');

// মিডলওয়্যার: ইমেজ আপলোডের ফোল্ডার ডাইনামিক করার জন্য
const setUserFolder = (req, res, next) => {
  req.uploadFolder = "User_Image";
  next();
};

// ==========================================
// ১. পাবলিক রাউটস (লগইন বা টোকেন লাগবে না)
// ==========================================
router.post('/login', userController.loginUser);

// Forgot Password ফ্লো-এর রাউটস (অবশ্যই protect মিডলওয়্যারের উপরে থাকবে)
router.post('/forgot-password/send-otp', userController.sendOTP);
router.post('/forgot-password/verify-otp', userController.verifyOTP);
router.post('/forgot-password/reset-password', userController.resetPassword);


// ==========================================
// ২. প্রটেক্টেড রাউটস (টোকেন বাধ্যতামূলক)
// ==========================================
// এই লাইনের নিচের সব রাউটে যাওয়ার আগে protect মিডলওয়্যার টোকেন চেক করবে
router.use(protect); 

router.get("/verify-me", userController.getMe);
router.put("/change-password", userController.changePassword);

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