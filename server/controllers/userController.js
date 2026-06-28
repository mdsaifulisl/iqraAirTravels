const User = require("../models/User");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: "no user found" });
    }

    if (user.status !== "Active") {
      return res
        .status(403)
        .json({ success: false, message: "user is not active" });
    }

    // ৩. পাসওয়ার্ড চেক করা
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "incorrect password" });
    }

    // ৪. JWT টোকেন তৈরি করা
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "0ajnhadsfbnikjlsadfhjkln&*(*3wldafskljbfsda;l",
      { expiresIn: "1d" },
    );

    
    // ৫. কুকিতে বা রেসপন্সে টোকেন পাঠানো
    res.status(200).json({
      success: true,
      message: "লগইন সফল হয়েছে!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// userController.js (verifyMe ফাংশন)
exports.getMe = async (req, res) => {
    try {
        // req.user.id 
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] } 
        });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const imgurl = user.image;
        if (imgurl) {
            user.image = `${BASE_URL}${imgurl}`;
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};





// Helper Functions
const formatUserData = (user) => {
  const data = user.toJSON();
  if (data.image) {
    data.image = `${BASE_URL}${data.image}`;
  }
  // সিকিউরিটির জন্য রেসপন্স থেকে পাসওয়ার্ড বাদ দেওয়া
  delete data.password;
  return data;
};

// ১. Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, role, status, bio, password } = req.body;

    const folder = req.uploadFolder || "users";

    const hashedPassword = await bcrypt.hash(password, 10);
    const imagePath = req.file
      ? `/uploads/${folder}/${req.file.filename}`.replace(/\\/g, "/")
      : null;


      const chackUser = await User.findOne({ where: { email } });
      if (chackUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }

    const newUser = await User.create({
      name,
      email,
      phone,
      role,
      status,
      bio,
      password: hashedPassword,
      image: imagePath,
    });

    res.status(201).json({
      success: true,
      message: "member created successfully",
      data: formatUserData(newUser),
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ২. Update User
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updateData = { ...req.body };
    const folder = req.uploadFolder || "users";

    if ( 
      updateData.password &&
      updateData.password !== "" &&
      updateData.password !== "null"
    ) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    if (req.file) {
      const newImagePath = `/uploads/${folder}/${req.file.filename}`.replace(
        /\\/g,
        "/",
      );

      if (user.image) {
        const oldImagePath = path.join(__dirname, "..", user.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = newImagePath;
    } 

    await user.update(updateData);

    res.status(200).json({
      success: true,
      message: "updated successfully!",
      data: formatUserData(user),
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id; // authMiddleware 

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "old password is incorrect!" 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "password changed successfully!",
    });

  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।" 
    });
  }
};

// ৩. Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["createdAt", "DESC"]] });
    const formattedUsers = users.map((user) => formatUserData(user));
    res
      .status(200)
      .json({
        success: true,
        massage: "mamber list",
        data: formattedUsers,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৪. Get User By ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: formatUserData(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৫. Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // ইমেজ ডিলিট করা
    if (user.image) {
      const imagePath = path.join(__dirname, "..", user.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await user.destroy();
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
