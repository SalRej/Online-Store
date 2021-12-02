const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const soap = require('soap');

const Product = require('../models/product');
const Categorie = require('../models/categories');

router.get('/:category/:subCategory/:products/:productID',(req,res)=>{

    Product.find({id:req.params.productID}).then((result=>{
        const url = 'http://infovalutar.ro/curs.asmx?wsdl';
        let currency;
        if(typeof(req.query.currency)!='undefined'){
            currency = req.query.currency;
        }else{
            currency = result[0].currency;
        }

        soap.createClient(url, (err, client) => {
            client.getlatestvalue({Moneda:currency},function(err, currencyResult){
                const currencyValue = currencyResult.getlatestvalueResult;
                res.render("product-description",
                {product:result[0]
                ,currencyValue:currencyValue
                ,currencyName:currency
                ,mainCategory:req.params.category
                ,subCategory:req.params.subCategory
                ,products:req.params.products
                }); 
            });
        });
    }))    
})

module.exports = router;