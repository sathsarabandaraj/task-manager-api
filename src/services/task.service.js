const Task = require('../models/task.model');

class TaskService {
    // Get all tasks with optional filtering
    async getAllTasks(filters = {}) {
        try {
            const query = {};

            // Apply filters if provided
            if (filters.status) query.status = filters.status;
            if (filters.priority) query.priority = filters.priority;
            if (filters.category) query.category = filters.category;

            const tasks = await Task.find(query).sort({ createdAt: -1 });
            return tasks;
        } catch (error) {
            throw new Error(`Error fetching tasks: ${error.message}`);
        }
    }

    // Get single task by ID
    async getTaskById(id) {
        try {
            const task = await Task.findById(id);
            if (!task) {
                throw new Error('Task not found');
            }
            return task;
        } catch (error) {
            throw new Error(`Error fetching task: ${error.message}`);
        }
    }

    // Create new task
    async createTask(taskData) {
        try {
            const task = new Task(taskData);
            await task.save();
            return task;
        } catch (error) {
            throw new Error(`Error creating task: ${error.message}`);
        }
    }

    // Update task
    async updateTask(id, updateData) {
        try {
            const task = await Task.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );
            if (!task) {
                throw new Error('Task not found');
            }
            return task;
        } catch (error) {
            throw new Error(`Error updating task: ${error.message}`);
        }
    }

    // Delete task
    async deleteTask(id) {
        try {
            const task = await Task.findByIdAndDelete(id);
            if (!task) {
                throw new Error('Task not found');
            }
            return task;
        } catch (error) {
            throw new Error(`Error deleting task: ${error.message}`);
        }
    }
}

module.exports = new TaskService();