const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) => {
    // Wrong mongodb id error
    if(err.name == "CastError"){
        const message = `Resource not found.Invalid path ${err.path}`;
        error = new ErrorHandler(message,400);

    }
    //Handling Mongoose Validation Error
    if(err.name == "ValidationError"){
        console.log("ValidationError");
        const message = Object.values(err.errors).map(value=> value.message)
        error = new ErrorHandler(message,400);

    }
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    
    res.status(err.statusCode).json({
        success:false,
        error:err.stack
    })
}