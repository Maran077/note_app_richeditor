const ErrorHandler  = require("./errorHandler");

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENVIRONMENT === "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      err,
    });
  }

  if (process.env.NODE_ENVIRONMENT === "production") {
    let message = err.message;
    let error = { ...err };
    console.log(error.message);
    if (error.name === "ValidationError") {
      message = Object.values(error.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    if (error.name === "CastError") {
      message = `Resource is not ${error.path}`;
      error = new ErrorHandler(message, 404);
    }

    if (error.name === "JsonWebTokenError") {
      message = "please login first";
      error = new ErrorHandler(message, 404);
    }

    res.status(error.statusCode || err.statusCode || 500).json({
      success: false,
      message: error.message || err.message || "Internal server error",
    });
  }
};

module.exports = errorMiddleware;
