const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//setting up env path
dotenv.config({path:'backend/config/config.env'});

// Handling uncaught Exception

process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down server due to uncaught exception");
    process.exit(1);
})

// connecting with mongodb
connectDatabase();

console.log(process.env.PORT);
const server = app.listen(3000,()=>{
    console.log(`server running on ${process.env.PORT}`);
});

// Handling unhandled exceptions

process.on("unhandledRejection",err=>{
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down server due to unhandled rejection");
    server.close(()=>{
        process.exit(1);
    })
})