const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Task = require('./task.model');

const ChildTask = sequelize.define('ChildTask', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM("Pending", "In Progress", "Completed"), defaultValue: "Pending" },
  dueDate: { type: DataTypes.DATE },
  priority: { type: DataTypes.ENUM("Low", "Medium", "High"), defaultValue: "Medium" },
  taskId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Task, key: 'id' } }
}, { timestamps: true });

module.exports = ChildTask;
