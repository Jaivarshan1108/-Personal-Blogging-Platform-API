const mongoose = require('mongoose');

const connectdb = async() =>{
    
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/blog');
        console.log("connected blog");
    }
    catch(err){
        console.log("mongodb coonect failed",err);
        process.exit(1);
    }
};

module.exports = connectdb;