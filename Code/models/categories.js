const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    categories:{
        type:Array,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
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
    parent_category_id:{
        type:String,
        required:true
    },
    c_showInMenu:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model('Categories',categoriesSchema);