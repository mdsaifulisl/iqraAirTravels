const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
  role: {
    type: DataTypes.ENUM("Super Admin", "Moderator", "Editor"),
    defaultValue: "Moderator",
  },
  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    defaultValue: "Active",
  },
  bio: { type: DataTypes.TEXT },
  password: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
});

module.exports = User;
