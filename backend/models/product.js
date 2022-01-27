const moongoose = require("mongoose");

const productSchema = moongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Product name"],
        trim:true,
        maxlength:[100,"Product name should not exceed 100 character"]
    },
    price:{
        type:String,
        required:[true,"Please enter Product Price"],
        maxlength:[5,"Product price should not exceed 5 character"],
        default:0.0
    },
    description:{
        type:String,
        required:[true,"Please enter Product description"],
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter Category for the product"],
        enum:{
            values:[
                "Paintings",
                "Home Decor",
                "Handicrafts",
                "Gift items"
            ],
            message:"Please select correct category for product"
        }
    },
    seller:{
        type:String,
        required:[true,"Please enter product seller"]
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    numOfReviews:{
        type:Number,
        required:true,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


module.exports = moongoose.model("Product",productSchema);