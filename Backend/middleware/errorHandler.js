// Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    // Default status code is 500 if not set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Set response status
    res.status(statusCode);

    // Send the error response
    res.json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack, // Hide stack trace in production
    });
};

export default errorHandler;
