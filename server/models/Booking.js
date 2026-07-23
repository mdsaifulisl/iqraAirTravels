const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  bookingType: {
    type: DataTypes.ENUM('tour', 'hajj'),
    allowNull: false,
    defaultValue: 'tour'
  },
  itemId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: true
  },
  address: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  specialRequest: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled'),
    defaultValue: 'Pending'
  }
}, {
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  tableName: 'bookings'
});

// --- Association Setup ---
const BookingDocument = require('./BookingDocument');

Booking.hasMany(BookingDocument, { foreignKey: 'bookingId', as: 'documents', onDelete: 'CASCADE' });
BookingDocument.belongsTo(Booking, { foreignKey: 'bookingId' });

module.exports = Booking;