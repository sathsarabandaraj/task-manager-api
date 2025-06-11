// 🚨 The Error Handler - When things go WRONG!
const errorHandler = (err, req, res, next) => {
    console.error('💥 ERROR HANDLER: "OH BOY, SOMETHING EXPLODED!"', err.message);

    // 📝 Mongoose validation error (when your data is naughty)
    if (err.name === 'ValidationError') {
        console.log('🤦‍♂️ ERROR HANDLER: "Someone sent invalid data AGAIN..."');
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Validation Error - Your data is misbehaving!',
            errors: errors,
            hint: '💡 Check your data types and required fields'
        });
    }

    // 🔄 Mongoose duplicate key error (trying to be too unique)
    if (err.code === 11000) {
        console.log('🙄 ERROR HANDLER: "Someone tried to create a duplicate..."');
        return res.status(400).json({
            success: false,
            message: 'Duplicate entry detected!',
            hint: '💡 This item already exists. Try being more creative!'
        });
    }

    // 🆔 Mongoose cast error (invalid ObjectId - basically garbage ID)
    if (err.name === 'CastError') {
        console.log('🤨 ERROR HANDLER: "Someone sent a garbage ID..."');
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format',
            hint: '💡 Your ID should look like: 507f1f77bcf86cd799439011'
        });
    }

    // 🤷‍♂️ Default error (when we have no idea what happened)
    console.log('😵 ERROR HANDLER: "I have no idea what just happened..."');
    res.status(500).json({
        success: false,
        message: 'Something went wrong on our end!',
        hint: '💡 Try again, and if it still breaks, blame the developer',
        timestamp: new Date().toISOString()
    });
};

// 🕳️ Handle 404 errors (when routes don't exist)
const notFound = (req, res, next) => {
    console.log(`🔍 404 HANDLER: "Looking for ${req.originalUrl}... NOPE, not here!"`);
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        hint: '💡 Check your URL spelling, or maybe this endpoint doesn\'t exist yet',
        availableRoutes: [
            'GET /api/tasks',
            'POST /api/tasks',
            'GET /api/tasks/:id',
            'PUT /api/tasks/:id',
            'DELETE /api/tasks/:id'
        ]
    });
};

// 🕐 Request Logger - The nosy middleware that logs everything
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`📝 LOGGER: "${timestamp} - ${req.method} ${req.url}"`);

    // Log request body for POST/PUT (but hide sensitive data)
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        console.log('📦 REQUEST BODY:', req.body);
    }

    next(); // Don't forget this or your request will hang forever!
};

module.exports = { errorHandler, notFound, requestLogger };