const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    price_max:{
        type:Number,
        required:true
    },
    page_description:{
        type:String,
        required:true
    },
    page_title:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    variations_attributes:{
        type:Array,
        required:true
    },
    primary_category_id:{
        type:String,
        required:true
    },
    image_groups:{
        type:Array,
        required:true
    },
    short_description:{
        type:String,
        required:true
    },
    variants:{
        type:Array,
        required:true
    },
    currency:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Product',productSchema);