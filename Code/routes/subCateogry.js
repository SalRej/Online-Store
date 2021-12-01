const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Categories = require('../models/categories');

router.get('/:category/:categoryName',(req,res)=>{

    console.log("l");
    //const mainCategory=req.baseUrl.slice(1,req.baseUrl.length);
    const mainCategory = req.params.category;
    Categories.find({id:mainCategory}).then((result)=>{
      
      let subCategories;
      for(x of result[0].categories){
        if(x.name == req.params.categoryName){
          subCategories = x;
        }
      }
  
      res.render('sub_category',{
      subCategories:subCategories.categories,
      categoryName:req.params.categoryName});
    })

  })

module.exports = router;
