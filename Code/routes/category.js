const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Categories = require('../models/categories');


router.get('/',(req, res)=>{

  const mainCategory=req.baseUrl.slice(1,req.baseUrl.length);

  Categories.find({id:mainCategory}).then((result)=>{
    
    //array that will hold all categories
    const category = [];
    for(i of result[0].categories){
      category.push(i);
    }

    res.render('category',{
    mainCategory:mainCategory,
    pageTitle:result[0].page_title,
    pageDescription:result[0].page_description,
    category:category});

  });
});

const subCategory = require('./subCateogry');
router.use(`/`,subCategory);
module.exports = router;
