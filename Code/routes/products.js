const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Categories = require('../models/categories');
const Product = require("../models/product");

//this route shows the products page
router.get('/:categoryName/:productId',(req,res)=>{

    //look in the db for the product with current id
    Product.find({primary_category_id:req.params.productId}).then((result)=>{
      
      
      //slices the main cateogry(men or women)form the url
      const mainCategory=req.baseUrl.slice(1,req.baseUrl.length);

      //find the main category(men or women) for the db
      Categories.find({id:mainCategory}).then((resultFromCategory)=>{
            
      //products to send to the frontend
      let products=result;


        //send all products,whole main category from db,id of the current products
        //the sub category name ,and min,max and chosen values for the slider
        res.render("products",
            {products:products
            ,mainCategory:resultFromCategory[0]
            ,productId:req.params.productId
            ,currentSubCategory:req.params.categoryName         
            });
      });
    })
  })

module.exports = router;
