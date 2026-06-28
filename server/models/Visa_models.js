const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // আপনার ডাটাবেজ কানেকশন ফাইলের পাথ

const Visa = sequelize.define(
  "Visa",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: { 
      type: DataTypes.STRING,
    },
    fee: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    validity: {
      type: DataTypes.STRING,
    },
    entry: {
      type: DataTypes.STRING,
    },
    continent: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    requirements: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "visas",
  },
);

module.exports = Visa;
