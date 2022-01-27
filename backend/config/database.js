const mongoose = require("mongoose");


const connectDatabase = (req,res,next)=>{
    mongoose.connect("mongodb://localhost:27017/ecommerce",{
        useCreateIndex:true,
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(con=>{
        console.log(`MONGODB SUCCESSFULLY CONNECTED WITH HOST ${con.connection.host}`)
    })
}


module.exports = connectDatabase;