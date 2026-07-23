const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BookingDocument = sequelize.define('BookingDocument', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  bookingId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  label: {
    type: DataTypes.STRING(50),
    defaultValue: 'Document'
  }
}, {
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  tableName: 'booking_documents'
});

module.exports = BookingDocument;