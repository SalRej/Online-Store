const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Categories = require('../models/categories');
const Product = require("../models/product");

//this route shows the products page
router.get('/:category/:subCategory/:products',(req,res)=>{

    //look in the db for the product with current id
    Product.find({primary_category_id:req.params.products}).then((result)=>{

      //slices the main cateogry(men or women)form the url
      const mainCategory=req.params.category;

      //find the main category(men or women) for the db
      Categories.find({id:mainCategory}).then((resultFromCategory)=>{

        res.render("products",
            {products:result
            ,mainCategory:resultFromCategory[0]
            ,productId:req.params.products
            ,currentSubCategory:req.params.subCategory         
            });
      });
    })
  })

module.exports = router;
