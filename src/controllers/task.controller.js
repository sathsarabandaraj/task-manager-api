const taskService = require('../services/task.service');

class TaskController {
    // GET /api/tasks
    async getAllTasks(req, res) {
        try {
            const { status, priority, category } = req.query;
            const filters = { status, priority, category };

            // Remove undefined values
            Object.keys(filters).forEach(key =>
                filters[key] === undefined && delete filters[key]
            );

            const tasks = await taskService.getAllTasks(filters);

            res.status(200).json({
                success: true,
                count: tasks.length,
                data: tasks
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // GET /api/tasks/:id
    async getTaskById(req, res) {
        try {
            const task = await taskService.getTaskById(req.params.id);

            res.status(200).json({
                success: true,
                data: task
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // POST /api/tasks
    async createTask(req, res) {
        try {
            const task = await taskService.createTask(req.body);

            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                data: task
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // PUT /api/tasks/:id
    async updateTask(req, res) {
        try {
            const task = await taskService.updateTask(req.params.id, req.body);

            res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                data: task
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // DELETE /api/tasks/:id
    async deleteTask(req, res) {
        try {
            await taskService.deleteTask(req.params.id);

            res.status(200).json({
                success: true,
                message: 'Task deleted successfully'
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new TaskController();
