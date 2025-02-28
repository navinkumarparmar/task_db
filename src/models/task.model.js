const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM("Pending", "In Progress", "Completed"), defaultValue: "Pending" },
  dueDate: { type: DataTypes.DATE },
  priority: { type: DataTypes.ENUM("Low", "Medium", "High"), defaultValue: "Medium" },
  userId: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

module.exports = Task;
