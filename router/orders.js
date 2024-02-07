const express = require('express')
const router = express.Router()
const database = require('../services/database')
const Orders = require('../models/orders')
const Product = require('../models/product')
const Product_order = require('../models/product_order')
const User = require('../models/user')
const {findProductByID} = require("../services/database");
const passport = require('passport')
const {signUser} = require("../services/jwt");
const strategy = require('../strategies/jwtStrategy')

//User Bestellung
router.post('/orders/user', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const userId = req.user.id
            console.log(req.headers)
            console.log(userId)
            const order = await database.createOrderByUser(userId)
            for (let product of req.body.product) {

                const foundProduct = await database.findProductByID(product.id)
                if(foundProduct.stock < product.quantity){
                    throw new Error('Out of stock')
                }
                await database.productStock(foundProduct.id, product.quantity)
                await database.createOrderProduct(product, order.id)

            }

            res.status(201).send('Order successful')
        }catch (e){
            console.log(e)
            if (e.message.startsWith('Out of stock')){
                res.status(400).send(e.message)
            }else{
                res.status(500).send('order error occured  ')
            }

        }

    })

// Gäste Bestellung
router.post('/orders', async(req,res)=>{
    try{
        const order = await database.createOrderByGuest(req.body)

        for (let product of req.body.product) {

            const foundProduct = await database.findProductByID(product.id)
            console.log(product)
            if(foundProduct.stock < product.quantity){
                throw new Error('Out of stock')
            }
            await database.productStock(foundProduct.id, product.quantity)
            console.log(foundProduct.id)
            await database.createOrderProduct(product, order.id)
            console.log(product)

        }

        res.status(201).send('order successful')
    }catch (e){
        console.log(e)
        if (e.message.startsWith('Out of stock')){
            res.status(400).send(e.message)
        }else{
            res.status(500).send(e.message)
        }

    }

})


// Bestellübersicht für eingeloggten user
router.get('/orders', passport.authenticate('jwt', {session: false}),async(req,res)=>{
    try{
        const userId = req.user.id
        const orders = await database.ordersByUserId(userId)
        res.status(200).json(orders)
    }catch (error){
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})
module.exports = router



