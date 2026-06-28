const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const About = sequelize.define('About', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // অটোমেটিক UUID জেনারেট করবে
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    experience: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    timestamps: true,
});

module.exports = About;