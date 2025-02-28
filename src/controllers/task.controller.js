const  Task = require('../models/task.model');
const  ChildTask = require('../models/childTask.model');

exports.createTask = async (req, res) => {
    try {
      const { title, description, dueDate, priority } = req.body;
      const task = await Task.create({ title, description, dueDate, priority, userId: req.user.id });
  
      res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getTasks = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });
  
    res.json({ tasks });
  };
  
  exports.updateTask = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });
  
      await task.update(req.body);
      res.json({ message: "Task updated successfully", task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  




  // child task

  exports.createChildTask = async (req, res) => {
    try {
      const { title, description, dueDate, priority } = req.body;
      const { mainTaskId } = req.params;
  
      const mainTask = await Task.findByPk(mainTaskId);
      if (!mainTask) return res.status(404).json({ message: "Main task not found" });
  
      const childTask = await ChildTask.create({ title, description, dueDate, priority, taskId: mainTaskId });
  
      res.status(201).json({ message: "Child task created successfully", childTask });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getChildTasks = async (req, res) => {
    try {
      const { mainTaskId } = req.params;
  
      const mainTask = await Task.findByPk(mainTaskId);
      if (!mainTask) return res.status(404).json({ message: "Main task not found" });
  
      const childTasks = await ChildTask.findAll({ where: { taskId: mainTaskId } });
  
      res.json({ childTasks });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  



  exports.updateChildTask = async (req, res) => {
    try {
      const { mainTaskId, childTaskId } = req.params;
  
      const childTask = await ChildTask.findOne({ where: { id: childTaskId, taskId: mainTaskId } });
      if (!childTask) return res.status(404).json({ message: "Child task not found" });
  
      await childTask.update(req.body);
  
      res.json({ message: "Child task updated successfully", childTask });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  exports.deleteChildTask = async (req, res) => {
    try {
      const { mainTaskId, childTaskId } = req.params;
  
      const childTask = await ChildTask.findOne({ where: { id: childTaskId, taskId: mainTaskId } });
      if (!childTask) return res.status(404).json({ message: "Child task not found" });
  
      await childTask.destroy();
      res.json({ message: "Child task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
  
      if (!task) return res.status(404).json({ message: "Task not found" });
  
      await task.update(req.body);
  
      if (task.status === "Completed") {
        await ChildTask.update({ status: "Completed" }, { where: { taskId: task.id } });
      }
  
      res.json({ message: "Task updated successfully", task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  