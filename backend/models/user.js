const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        maxLength:[30,"Name should not exceed 30 characters"],
        required:[true,"Please enter the name"]
    },
    email:{
        type:String,
        required:[true,"Plese enter the email id"],
        unique:true,
        validator:[validator.isEmail,"Please enter valid Email Id"]
    },
    password:{
       type:String,
       required:[true,"Please enter Password"],
       select:false,
       minLength:[6,"Password should be atleast 6 characters"],
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        dafault:"User"
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    passwordExpiryToken:String,
    passwordExpiryDate:Date


});

// encrypting password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
            next()
    }
    this.password = await bcrypt.hash(this.password,10);
})

//Method to create json web token

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},"jbvjrbg75893478jbfsbgjb394tqugbiu",{
        expiresIn:'7d'
    })
}

// method to authenticate password

userSchema.methods.comparePassword =  async function (enteredPassword){
    console.log("comparePassword",enteredPassword,this.password,await bcrypt.compare(enteredPassword,this.password));
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.printMessage = async function (){
    console.log("print here");
}

module.exports = mongoose.model("User",userSchema);