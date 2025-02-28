const express = require('express');
const apiroutes = express.Router();
const taskController = require("../controllers/task.controller");
const authMiddleware = require('../middleware/auth.middleware');
const { validateTask } = require('../middleware/validate.middleware');

apiroutes.post('/create', authMiddleware.authMiddleware,validateTask, taskController.createTask);
apiroutes.get('/', authMiddleware.authMiddleware, taskController.getTasks);
apiroutes.put('/update/:id', authMiddleware.authMiddleware, taskController.updateTask);

apiroutes.post("/childTask/create/:mainTaskId", authMiddleware.authMiddleware, taskController.createChildTask);
apiroutes.get("/childTask/:mainTaskId/getAll", authMiddleware.authMiddleware, taskController.getChildTasks);
apiroutes.put("/childTask/:mainTaskId/update/:childTaskId", authMiddleware.authMiddleware, taskController.updateChildTask);
apiroutes.delete("/childTask/:mainTaskId/delete/:childTaskId", authMiddleware.authMiddleware, taskController.deleteChildTask);


module.exports = apiroutes;