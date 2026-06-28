const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Setting = sequelize.define(
    "Setting",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // Section 1: General Settings
    siteName: { type: DataTypes.STRING, defaultValue: "Travel Admin" },
    footerText: { type: DataTypes.STRING },
    maintenanceMode: { type: DataTypes.BOOLEAN, defaultValue: false },
    siteLogo: { type: DataTypes.STRING, allowNull: true },
    siteFavicon: { type: DataTypes.STRING, allowNull: true },

    // Section 2: Contact & Social Settings
    siteEmail: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    facebook: { type: DataTypes.STRING },
    instagram: { type: DataTypes.STRING },
    linkedin: { type: DataTypes.STRING },
    whatsapp: { type: DataTypes.STRING },

    // Section 3: SEO Settings
    metaTitle: { type: DataTypes.STRING },
    metaDescription: { type: DataTypes.TEXT },
  },
  {
    timestamps: true,
  },
);

module.exports = Setting;
