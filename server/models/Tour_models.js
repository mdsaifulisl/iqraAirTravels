const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Tour = sequelize.define('Tour', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  groupSize: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING, // যেহেতু আপনি "$1250" ফরম্যাটে দিয়েছেন
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  reviews: {
    type: DataTypes.INTEGER, 
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // MySQL-এ অ্যারে সেভ করার জন্য JSON টাইপ ব্যবহার করা হয়েছে
  images: {
    type: DataTypes.JSON, 
    allowNull: true
  },
  highlights: {
    type: DataTypes.JSON,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT, // বড় HTML কন্টেন্টের জন্য TEXT ব্যবহার করা হয়েছে
    allowNull: false
  }
}, {
  timestamps: true, // createdAt এবং updatedAt অটো তৈরি হবে
  charset: 'utf8mb4', // বাংলা সাপোর্ট করার জন্য
  collate: 'utf8mb4_unicode_ci'
});

module.exports = Tour; 