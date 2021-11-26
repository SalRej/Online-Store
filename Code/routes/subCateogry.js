const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Categories = require('../models/categories');
const Product = require('../models/product');


router.get('/:categoryName',(req,res)=>{

    const mainCategory=req.baseUrl.slice(1,req.baseUrl.length);
    console.log(mainCategory);
    Categories.find({id:mainCategory}).then((result)=>{
      
      let subCategories;
      for(x of result[0].categories){
        if(x.name == req.params.categoryName){
          subCategories = x;
        }
      }
  
      res.render('sub_category',{subCategories:subCategories.categories,
      categoryName:req.params.categoryName});
    })

  })
  
const products  = require('./products');
router.use('/',products);

module.exports = router;
