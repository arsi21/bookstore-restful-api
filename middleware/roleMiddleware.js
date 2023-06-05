const User = require("../models/userModel");

const roleMiddleware = (role) => {
    return (req, res, next) => {
        // Check if the user is authenticated and has the required role
        if (req.user && req.user.role === role) {
            // If the user has the required role, continue to the next middleware
            next();
        } else {
            // If the user doesn't have the required role, return a Forbidden error
            res.status(403);
            return next(new Error('Forbidden route'));
        }
    };
};

module.exports = {
    roleMiddleware
};