const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Slider = sequelize.define('Slider', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // অটোমেটিক UUID জেনারেট করবে
        primaryKey: true,
    },
    headline: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    subtext: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    btn1: {
        type: DataTypes.STRING(50),
        defaultValue: "Explore Now",
    },
    btn2: {
        type: DataTypes.STRING(50),
        defaultValue: "Learn More",
    },
    link: {
        type: DataTypes.STRING(255),
        defaultValue: "/destinations",
    },
    image: {
        type: DataTypes.STRING(255), // Image URL or Path
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    timestamps: true, // CreatedAt & UpdatedAt
});

module.exports = Slider;