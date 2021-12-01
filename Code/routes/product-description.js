const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var soap = require('soap');

const Product = require('../models/product');

router.get('/:category/:subCategory/:products/:productID',(req,res)=>{

    Product.find({id:req.params.productID}).then((result=>{
        const url = 'http://infovalutar.ro/curs.asmx?wsdl';

        if(typeof(req.query.currency)!='undefined'){
            soap.createClient(url, function(err, client){
                client.getlatestvalue({Moneda:req.query.currency},function(err, currencyResult){
                    const currencyValue = currencyResult.getlatestvalueResult
                    res.render("product-description",{product:result[0],currencyValue:currencyValue,currencyName:req.query.currency});
                 });
            });
        }else{
            soap.createClient(url, function(err, client) {
                client.getlatestvalue({Moneda:"USD"},function(err, currencyResult){
                    const currencyValue = currencyResult.getlatestvalueResult;
                    res.render("product-description",{product:result[0],currencyValue:currencyValue,currencyName:"USD"}); 
                });
            });
        }
    }))
})

module.exports = router;