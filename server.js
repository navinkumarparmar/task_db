const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const routes = require('./src/routes/index')
const { connectDB } = require("./src/config/database");
const appModule = require("./src/app");
dotenv.config(); 
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Database Connection
connectDB();

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});
app.use('/api', routes);
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
