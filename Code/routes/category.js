const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Categories = require('../models/categories');
let cat;

router.get('/',(req, res)=>{

  const mainCategory=req.baseUrl.slice(1,req.baseUrl.length);
  console.log(mainCategory);

  Categories.find({id:mainCategory}).then((result)=>{
    
    //array that will hold all categories
    const category = [];
    for(i of result[0].categories){
      category.push(i);
    }

    res.render('category',{mainCategory:mainCategory,
    pageTitle:result[0].page_title,
    pageDescription:result[0].page_description,
    category:category});

  });

});


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

const Product = require("../models/product");

router.get('/:categoryName/:productId',(req,res)=>{

  let t = Product.find({primary_category_id:req.params.productId});
  
  t.then(async (result)=>{
    const mainCategory=req.baseUrl.slice(1,req.baseUrl.length);
    Categories.find({id:mainCategory}).then((resultFromCategory)=>{
      console.log(resultFromCategory);
      res.render("products",{products:result
        ,mainCategory:resultFromCategory[0]
        ,currentCategory:req.params.productId});
    });
  })
})
module.exports = router;
