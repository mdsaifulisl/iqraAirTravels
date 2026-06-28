const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const Destination = sequelize.define('Destination', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    duration: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT, 
        allowNull: true
    },
    images: {
        type: DataTypes.JSON, 
        allowNull: true
    },
    highlights: {
        type: DataTypes.JSON, 
        allowNull: true
    }
}, {
    timestamps: true, 
    tableName: 'destinations' 
});

module.exports = Destination;