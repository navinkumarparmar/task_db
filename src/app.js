const express = require("express");
const app = express();

// Middleware & Routes
app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes")); // ✅ Fix: add ".routes"
app.use("/api/tasks", require("./routes/task.routes")); // ✅ Fix: add ".routes"


module.exports = app; // ✅ Make sure this line is present
