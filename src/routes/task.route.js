const express = require('express');
const taskController = require('../controllers/task.controller');
const { validateTask, validateTaskId } = require('../middleware/validation.middleware');

const router = express.Router();

// 📋 GET /api/tasks - Get all tasks (with optional filtering)
// No validation needed - just getting data
router.get('/', taskController.getAllTasks);

// 🔍 GET /api/tasks/:id - Get task by ID  
// Validate the ID parameter
router.get('/:id', validateTaskId, taskController.getTaskById);

// ✨ POST /api/tasks - Create new task
// Validate the task data before creating
router.post('/', validateTask, taskController.createTask);

// ✏️ PUT /api/tasks/:id - Update task
// Validate both ID and task data
router.put('/:id', validateTaskId, validateTask, taskController.updateTask);

// 🗑️ DELETE /api/tasks/:id - Delete task
// Only validate the ID
router.delete('/:id', validateTaskId, taskController.deleteTask);

module.exports = router;
