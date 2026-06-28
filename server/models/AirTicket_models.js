const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AirTicket = sequelize.define('AirTicket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false
    },
    airline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    trip_type: {
        type: DataTypes.ENUM('Round Trip', 'One Way', 'Multi-City'),
        defaultValue: 'Round Trip'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'air_tickets', 
    timestamps: true,
    underscored: true
});

module.exports = AirTicket;