const express = require('express')
const router = express.Router()
const database = require('../services/database')
const passport = require("passport")
const admin = require('../models/admins')
const product =require('../models/product')
const {findAdmin} = require("../services/database");
const {signAdmin} = require("../services/jwt");


// all products
router.get('/products', async(req,res)=>{
    try{
        const products = await database.findProducts()
        res.json(products)
    }catch (e) {
        res.status(500).send('Internal Server Error')
    }

})

// details product
router.get('/products/:id', async (req,res)=>{
   try{
       const productDetails = await database.findProductByID(req.params.id)
       if(!productDetails){
           throw new Error('Product Id not found')
       }
       res.json(productDetails)
   }catch (e) {
       console.log(e)
       res.status(404).send(e.message)
   }

})

//Produktsuche
router.get('/products/search/:searchString', async(req,res)=>{
    try{
        const searchProduct = await database.searchProduct(req.params.searchString)
        res.json(searchProduct)
    }catch (error) {
        res.status(404).send(error.message)
    }

})

// Produktsortierung
router.get('/products/sort/:sortType', async(req,res)=>{
   try{
       const sortType =req.params.sortType
       const sortedProducts = await database.sortProducts(sortType)
       res.json(sortedProducts)
   } catch(error){
       res.status(500).send(error.message)
   }

})



module.exports = router