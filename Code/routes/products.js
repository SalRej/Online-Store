const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Categories = require('../models/categories');
const Product = require("../models/product");

//this route shows the products page
router.get('/:category/:subCategory/:products',(req,res)=>{

    //look in the db for the product with current id
    Categories.find({id:req.params.category}).then((resultFromCategory)=>{

      Product.find({primary_category_id:req.params.products}).then((result)=>{

        //find the main category(men or women) for the db
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
