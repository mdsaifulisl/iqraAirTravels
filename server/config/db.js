const { Sequelize } = require('sequelize');
require('dotenv').config();

// MySQL কানেকশন কনফিগারেশন
const sequelize = new Sequelize(
  process.env.DB_NAME || 'travel_agency_db', 
  process.env.DB_USER || 'root',            
  process.env.DB_PASSWORD || 'root',            
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',                                            
    logging: false,
    
    // --- set UTF-8 support for MySQL database ---
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      timestamps: true
    },
    dialectOptions: {
      charset: 'utf8mb4',
    },
    // -------------------------------------------------------

    pool: {
      max: 5,                                               
      min: 0,                                               
      acquire: 30000,
      idle: 10000
    }
  }
);

// ডাটাবেজ কানেকশন টেস্ট করার ফাংশন
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database Connected Successfully via Sequelize!');
    console.log('🚀 Dbs connected successfully. Code by Saiful');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.error('⚠️ Dbs not connected. Code by Saiful');
    process.exit(1); 
  }
};

module.exports = { sequelize, connectDB };