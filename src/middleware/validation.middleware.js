// 🛡️ Our Validation Bouncer - Checks if requests are properly dressed
const validateTask = (req, res, next) => {
    console.log('🛡️ VALIDATION BOUNCER: "Hold up! Let me check your task..."');

    const { title, status, priority } = req.body;
    const errors = [];

    // 📝 Check if title exists and isn't just spaces
    if (!title || title.trim().length === 0) {
        errors.push('Title is required! Even "Buy milk" is better than nothing.');
    }

    // 📏 Check title length (because novels don't make good task titles)
    if (title && title.length > 100) {
        errors.push('Title too long! This is a task, not your autobiography.');
    }

    // ✅ Check status is valid (we don't accept "maybe" or "depends on my mood")
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
        errors.push(`Status must be one of: ${validStatuses.join(', ')}. "maybe-tomorrow" is not an option!`);
    }

    // 🚨 Check priority is valid (we don't do "kinda urgent")
    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
        errors.push(`Priority must be one of: ${validPriorities.join(', ')}. "SUPER MEGA URGENT" is not a thing!`);
    }

    // 📧 Basic email validation if provided (because "me@gmail" is not an email)
    if (req.body.assignedTo && req.body.assignedTo.includes('@')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.assignedTo)) {
            errors.push('That email looks suspicious... 🤔');
        }
    }

    // 🚫 If we found errors, stop here and shame them
    if (errors.length > 0) {
        console.log('❌ VALIDATION BOUNCER: "NOPE! Fix these issues first!"');
        return res.status(400).json({
            success: false,
            message: 'Validation failed! Please fix these issues:',
            errors: errors,
            hint: '💡 Read the error messages, they\'re actually helpful!'
        });
    }

    console.log('✅ VALIDATION BOUNCER: "Looking good! You may pass..."');
    next(); // 👍 Pass it to the next middleware/controller
};

// 🆔 ID Validation - Checks if the ID isn't garbage
const validateTaskId = (req, res, next) => {
    console.log('🔍 ID CHECKER: "Let me see that ID..."');

    const { id } = req.params;

    // Check if it's a valid MongoDB ObjectId (24 hex characters)
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
        console.log('❌ ID CHECKER: "This ID is faker than a $3 bill!"');
        return res.status(400).json({
            success: false,
            message: 'Invalid task ID format',
            hint: '💡 Task IDs should be 24 characters long and contain only letters and numbers',
            yourId: id,
            example: '507f1f77bcf86cd799439011'
        });
    }

    console.log('✅ ID CHECKER: "ID looks legit! Moving on..."');
    next();
};

module.exports = { validateTask, validateTaskId };
  