const mongoose = require('mongoose');

const articleschema = new mongoose.Schema({
    title :{
        type : String,
        require : true
    },
    content :{
        type : String,
        require :true
    },
    author : {
        type : String,
        require : true
    },
    tags :{
        type :[String],
        default :[]
    },
    date :{
        type : Date,
        require : true
    }
});

module.exports = mongoose.model('article',articleschema);
