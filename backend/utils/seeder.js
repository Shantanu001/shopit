const product = require("../data/product.json");
const Product = require("../models/product");
const connectDatabase = require("../config/database");
const {connect} = require("mongoose");




connectDatabase();


const seedProduct = async ()=>{
    try{
        await Product.deleteMany();
        console.log("All Products are deleted");
        await Product.insertMany(product);
        console.log("Products are added to the collection");
        process.exit();
    }catch(err){
        console.log(err.message);
        process.exit();
    }
}

seedProduct();