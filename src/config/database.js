const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    
    await sequelize.sync({ alter: true });
    console.log("✅ All tables checked/created successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process if DB fails
  }
};

module.exports = { sequelize, connectDB };
