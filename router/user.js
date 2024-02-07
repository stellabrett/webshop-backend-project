const express = require('express')

const database = require("../services/database");
const passport = require("passport");
const jwt = require("../services/jwt");
const router = express.Router()

// Produktvorschläge
/*
router.get('/user/lastorder', passport.authenticate('jwt', {session: false}),async(req,res)=>{
    try{
        const userId = req.user.id
        const lastOrder = await database.getLastOrdersByUser(userId)
        res.status(200).json(lastOrder)
    }catch (error){
        console.log(error)
        res.status(500).send('ERror beim abrufen der Bestellung')
    }
})

*/

module.exports = router