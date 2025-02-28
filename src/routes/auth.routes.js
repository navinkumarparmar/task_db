const express = require("express");
const apiroutes = express.Router();
const authController = require("../controllers/auth.controller");


apiroutes.post("/register", authController.register);
apiroutes.post("/login", authController.login);

module.exports = apiroutes;
