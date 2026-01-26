const express = require('express');
const router = express.Router();
const usersController = require('../controllers/todos.controller'); // Import controller
const { deleteTodo } = require('../controllers/todos.controller');

// Define a GET route for /api/todos
router.get('/', usersController.getAllTodos);

// Define a POST route for /api/todos
router.put('/', usersController.updateATodo);

router.post('/', usersController.postATodo);

router.delete('/',deleteTodo)
module.exports = router;