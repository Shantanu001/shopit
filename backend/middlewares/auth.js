const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user");

// Checks if the user is authenticated
const isAuthenticatedUser = async(req,res,next)=>{
    const {token} = req.cookies;
    console.log("here",token);
    if(!token){
        next(new ErrorHandler("user is not authenticated to login",401));
    } else {
        const decode = jwt.verify(token,"jbvjrbg75893478jbfsbgjb394tqugbiu");
        req.user = await User.findById(decode.id);
        next();
    }
};

module.exports = isAuthenticatedUser;