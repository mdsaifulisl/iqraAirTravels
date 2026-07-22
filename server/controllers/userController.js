const User = require("../models/User");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

require("dotenv").config();
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Nodemailer Transporter Setup Gmail App Password
// const transporter = nodemailer.createTransport({
//   service: "gmail", 
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS || "sphavwsxjmxkymrl",
//   },
// });

// Nodemailer Transporter Setup Cpanel 
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper Function
const formatUserData = (user) => {
  const data = user.toJSON();
  if (data.image) {
    data.image = `${BASE_URL}${data.image}`;
  }
  delete data.password;
  delete data.otpCode;
  delete data.otpExpires;
  return data;
};

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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "incorrect password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "0ajnhadsfbnikjlsadfhjkln&*(*3wldafskljbfsda;l",
      { expiresIn: "1d" },
    );

    res.status(200).json({
      success: true,
      message: "লগইন সফল হয়েছে!",
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

// Get Me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password", "otpCode", "otpExpires"] },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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

// ১. Create User (Auto-generate Password & Mail)
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, role, status, bio } = req.body;

    const chackUser = await User.findOne({ where: { email } });
    if (chackUser) {
      if (req.file) fs.unlinkSync(req.file.path); 
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const generatedPassword = otpGenerator.generate(8, {
      upperCaseAlphabets: true,
      specialChars: false,
      lowerCaseAlphabets: true,
      digits: true,
    });

    const folder = req.uploadFolder || "users";
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    const imagePath = req.file
      ? `/uploads/${folder}/${req.file.filename}`.replace(/\\/g, "/")
      : null;

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

    const mailOptions = {
  from: `"Iqra Air Travels" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Welcome to Iqra Air Travels Team - Account Created",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #008080; text-align: center;">Welcome, ${name}!</h2>
      <p>An administrative account has been created for you at <strong>Iqra Air Travels</strong> with the role of <strong>${role}</strong>.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #008080;">
        <p style="margin: 0 0 10px 0;"><strong>Your Login Credentials:</strong></p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 5px 0;"><strong>Temporary Password:</strong> <span style="background: #eef; padding: 2px 6px; font-family: monospace; font-size: 16px; font-weight: bold; color: #d9534f;">${generatedPassword}</span></p>
      </div>

      <!-- Login Button Section -->
      <div style="text-align: center; margin: 25px 0;">
        <a href="${process.env.BASE_URL || 'http://localhost:5000'}/login" 
           style="background-color: #008080; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
           Login to Your Account
        </a>
      </div>
      
      <p style="color: #555; font-size: 13px; text-align: center;">Please log in using these credentials and change your password as soon as possible for security reasons.</p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;">
      <p style="color: #999; font-size: 11px; text-align: center; margin-top: 10px;">
        This is an automated administrative notification from Iqra Air Travels.<br>
        Uchitpura bazar, Araihazar, Narayanganj, Dhaka, Bangladesh | Support: iqra.air.bd@gmail.com
      </p>
    </div>
  `,
};

    transporter.sendMail(mailOptions).catch((err) => {
      console.error("Background Email Sending Error: ", err);
    });

    return res.status(201).json({
      success: true,
      message: "Member created successfully. Account details is being sent via email.",
      data: formatUserData(newUser),
    });

  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(500).json({ success: false, message: error.message });
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

// Forgot Password - Step 1: Send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No user found with this email" });
    }

    // ৬ ডিজিটের ওটিপি কোড জেনারেট করা
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    // ওটিপি ও মেয়াদ (১০ মিনিট) ডাটাবেজে সেভ করা (মডেলে otpCode এবং otpExpires কলাম থাকতে হবে)
    user.otpCode = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h3 style="color: #008080;">Password Reset Request</h3>
          <p>You requested a password reset code. Use the OTP below to complete the verification process:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #008080; background: #f0fdfa; padding: 10px 20px; border-radius: 5px; border: 1px dashed #008080;">${otp}</span>
          </div>
          <p style="color: #666; font-size: 13px;">Note: This OTP is valid for 10 minutes only. If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "OTP sent successfully to your email" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Forgot Password - Step 2: Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.otpCode !== otp || Date.now() > user.otpExpires) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP code" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "OTP verified successfully. You can reset your password now.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Forgot Password - Step 3: Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });

    // রি-ভেরিফিকেশন টোকেন বা ওটিপি সেফটি চেক
    if (!user || user.otpCode !== otp || Date.now() > user.otpExpires) {
      return res
        .status(400)
        .json({ success: false, message: "Session expired, please try again" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otpCode = null; // ওটিপি ক্লিয়ার করে দেওয়া
    user.otpExpires = null;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change Password (Logged in User)
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "old password is incorrect!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "password changed successfully!" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।",
      });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["createdAt", "DESC"]] });
    const formattedUsers = users.map((user) => formatUserData(user));
    res
      .status(200)
      .json({ success: true, massage: "mamber list", data: formattedUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User By ID
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

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

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
