const express = require('express')
const passport = require ('passport')
const database = require("../services/database");
const router = express.Router()
const Products = require('../models/product')
const jwt = require("../services/jwt");
const multer = require('multer')
const upload = require('../services/multer')



//admin create
router.post('/admins', async (req,res)=> {
    try{
        const admin = await database.createAdmin(req.body)
        res.json(admin)
    }catch (e){
        if(e.name === 'SequelizeValidationError'){
            res.send(e.message)
        }else{
            res.status(500).send('admin could not be created')
        }

    }
})

//admin login
router.post('/admin/login', passport.authenticate('admin-strategy', {session:false}), async (req, res) => {
    try {

        const token = jwt.signAdmin(req.user)
        res.json({token: token, user: req.user})
    } catch (e) {
        console.log(e)
        res.status(500).send('Login failed')
    }
})


//Produkt anlegen
router.post('/admin/products',passport.authenticate('jwt', {session: false}), upload.single('image'), async (req, res) => {
    try {
        const image =req.body.imageURL
        const { stock, name, price, description, categoryId } = req.body
        await database.addProduct({stock, name, price, description, categoryId, image})
        res.json('Product created successfully')
    }catch (e) {
        console.error(e)
        res.status(400).send('Bad Request')
    }
})

// Produkte updaten

router.put('/admin/products/:id',passport.authenticate('jwt', {session:false}), async (req, res)=>{
    try{
        await database.updateProduct(req.params.id, req.body)
        res.json(req.body)
    }catch (e) {
        console.error(e)
        res.status(500).send('Update Product failed')
    }
})

// Produkte löschen

router.delete('/admin/products/:id', passport.authenticate('jwt', {session: false}), async (req, res)=>{
    try{
        await database.deleteProduct(req.params.id, req.body)
        res.status(201).send('marked as deleted')
    }catch (e) {
        console.error(e)
        res.status(500).send('Cannot delete product')
    }
})

//Produktübersicht admins

router.get('/admin/products',passport.authenticate('jwt', {session: false}), async (req, res)=>{
    try{
       const products = await database.findProducts()
        res.json(products)
    }catch (e) {
     console.log(e)
     res.status(500).send('product overview error')
    }
})

// Bestellstatus ändern
router.put('/admin/status/:id',passport.authenticate('jwt', {session: false}), async (req,res)=>{
try{
    const orderStatus = await database.updateOrderStatus(req.params.id ,req.body)
    res.json(orderStatus)
    console.log(req.body.status)
    }catch (e) {
    console.error(e)
    if(e.message === 'Order Id is not found'){
        res.status(404).send ('Order Id is not found')
    } else {
        res.status(500).send('Order not found')
    }

}


})


// Bestellübersicht admins
router.get('/admin/orders', passport.authenticate('jwt', {session: false}), async (req,res)=> {
    try {
        const overview = await database.findAllOrders()
        res.json(overview)
    }catch (e) {
        console.error(e)
        res.status(500).send('Error, order overview couldnt be loaded')

    }

})

// Übersicht aller User
router.get('/admin/users', passport.authenticate('jwt', {session: false}), async (req,res)=> {
    try {
        const allUser = await database.findAllUsers()
        res.json(allUser)
    }catch (e) {
        console.error(e)
        res.status(401).send('Unauthorized')

    }

})

// User auslesen
router.get('/admin/user/:id', passport.authenticate('jwt', {session: false}), async (req,res)=> {
    try {
        const userById = await database.findUserById(req.params.id)
        res.json(userById)
    }catch (e) {
        console.error(e)
        res.status(404).send('User Id not found')

    }

})

// Kategorie erstellen
router.post('/admin/categories', passport.authenticate('jwt', {session: false}), async (req,res)=> {
    try {
        const categoryName = req.body.name
        const addCategory = await database.createCategory(categoryName)
        res.json(addCategory)
    }catch (e) {
        console.error(e)
        res.status(500).send('Error')

    }

})




module.exports = router