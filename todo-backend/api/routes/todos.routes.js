const express = require("express");
const router = express.Router();
const Controller = require("../controllers/todos.controller"); // Import controller
const { deleteTodo } = require("../controllers/todos.controller");

// Define a GET route for /api/todos
router.get("/", Controller.getAll);

// Define a POST route for /api/todos
router.put("/", Controller.update);

router.post("/", Controller.post);

router.patch("/", deleteTodo);
module.exports = router;
