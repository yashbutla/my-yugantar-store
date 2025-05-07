import ErrorHandler from '../utils/errorHandler.js';


export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 501;

    if (err.name === "CastError") {
        const message = `Resource not found with id ${err.path}`;
        err = new ErrorHandler(message, 401);
    }

    if (err.name === "ValidationError") {
        const validationErrors = Object.values(err.errors).map(error => error.message);
        return next(new ErrorHandler(validationErrors.join(','), 401));
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};


export default { errorMiddleware };
