const mongoose = require('mongoose');
const productSchema = new mongoose.Schema ({
    image : {
        type : String,
        // required : true,
        size : 255

    },
    name : {
        type : String,
        required : true,

    },
    description: {
        type : String,
    },
    Code : {
        type: String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    oldPrice : {
        type : Number,
    },
    discountPrice: {
        type : Number,
    },
    category : {
        type : String,
        required : true,
    },
    stock : {
        type : Number,
        required : true,
    },
    rating : {
        type : Number,
        default : 0,
        required : true,
    }
})