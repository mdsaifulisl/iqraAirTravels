const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ১. ডাইনামিক স্টোরেজ কনফিগারেশন
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // রাউট থেকে পাঠানো 'uploadFolder' নাম নিবে, না থাকলে ডিফল্ট 'others'
    const folderName = req.uploadFolder || 'others';
    const dest = `uploads/${folderName}/`;

    // ফোল্ডার না থাকলে তৈরি করবে (recursive: true মানে সব সাব-ফোল্ডারসহ তৈরি হবে)
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true }); 
    }
    
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    // ফাইলের নাম ইউনিক করার জন্য (যেমন: images-1712345678.png)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// ২. ফাইল ফিল্টার
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|webp|svg|ico/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('শুধুমাত্র ছবি (JPG, PNG, WEBP, SVG, ICO) আপলোড করা যাবে!'), false);
  }
};

// ৩. মিডলওয়্যার কনফিগারেশন
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // ৫ মেগাবাইট লিমিট
  fileFilter: fileFilter
});

module.exports = upload;