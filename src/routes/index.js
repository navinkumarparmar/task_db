const express = require("express");
const apiroutes = express.Router();

const auth = require('./auth.routes');
const taskRoutes = require('./task.routes');

apiroutes.use('/auth', auth);
apiroutes.use('/tasks', taskRoutes);
module.exports = apiroutes;