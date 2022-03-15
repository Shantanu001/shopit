const User = require("../models/user");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");



// register new user api/v1/user/new


exports.newUser = catchAsyncError(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"pexels-andrea-piacquadio-3760263_tk8hes",
            url:"https://res.cloudinary.com/dbobpxkad/image/upload/v1638528163/pexels-andrea-piacquadio-3760263_tk8hes.jpg"
        }
    });

    sendToken(user,200,res);
});

exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return new ErrorHandler("Email Id or Password not found",404);
    }
    const user = await User.findOne({ email }).select('+password');
    console.log("user",user);
    if(!user){
        return new ErrorHandler("Invalid Email Id or Password",401);
    }
    const isPasswordMatched = await user.comparePassword(password);
    console.log(isPasswordMatched);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email Id or Password",401));
    }
    
    sendToken(user,200,res);


})