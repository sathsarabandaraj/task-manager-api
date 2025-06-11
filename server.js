const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/utils/env.util');
const taskRoutes = require('./src/routes/task.route');
const { errorHandler, notFound, requestLogger } = require('./src/middleware/error.middleware');

const app = express();

console.log('🎬 SERVER: "Starting up the Task Manager API show!"');

// 🎭 MIDDLEWARE CONGA LINE STARTS HERE!

// 1️⃣ Request Logger - The nosy one
app.use(requestLogger);

// 2️⃣ JSON Parser - The translator
app.use(express.json());
console.log('🔧 SERVER: "JSON parser is ready to translate!"');

// Database connection
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('✅ DATABASE: "MongoDB connected! Ready to store your tasks!"');
    })
    .catch((error) => {
        console.error('❌ DATABASE: "MongoDB connection failed! Panic mode activated!"', error);
        process.exit(1);
    });

// 3️⃣ Main Route - The welcome mat
app.get('/', (req, res) => {
    res.json({
        message: '🎉 Task Manager API is running and ready for action!',
        version: '1.0.0',
        status: 'All systems go! 🚀',
        endpoints: {
            getAllTasks: 'GET /api/tasks',
            getTask: 'GET /api/tasks/:id',
            createTask: 'POST /api/tasks',
            updateTask: 'PUT /api/tasks/:id',
            deleteTask: 'DELETE /api/tasks/:id',
        },
        tips: [
            '💡 Try creating a task with POST /api/tasks',
            '💡 Filter tasks with ?status=pending or ?priority=high',
            '💡 Make sure your task has a title!',
            '💡 Check the console logs to see middleware in action'
        ]
    });
});

// 4️⃣ API Routes - The main event (with validation middleware)
app.use('/api/tasks', taskRoutes);

// 5️⃣ 404 Handler - The "you're lost" guide
app.use(notFound);

// 6️⃣ Error Handler - The cleanup crew (MUST BE LAST!)
app.use(errorHandler);

console.log('🎭 SERVER: "All middleware loaded and ready!"');

app.listen(config.PORT, () => {
    console.log('🎊 ====================================');
    console.log(`🚀 Server running on port ${config.PORT}`);
    console.log(`📍 Environment: ${config.NODE_ENV}`);
    console.log(`🔗 API Base URL: http://localhost:${config.PORT}`);
    console.log(`📚 Try: http://localhost:${config.PORT}/api/tasks`);
    console.log('🎊 ====================================');
    console.log('💡 Watch the console for middleware logs!');
});