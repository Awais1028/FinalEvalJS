const express = require("express");
const router = express.Router();

const todoRoutes = require("./routes/todos.routes"); // Adjust path if needed

router.use("/todos", todoRoutes);

module.exports = router;

