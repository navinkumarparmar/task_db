const User = require('./user.model');
const Task = require('./task.model');
const ChildTask = require('./childTask.model');

User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

Task.hasMany(ChildTask, { foreignKey: 'taskId', onDelete: 'CASCADE' });
ChildTask.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = { User, Task, ChildTask };
