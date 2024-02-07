const express = require('express')
const jwt = require('../services/jwt')
const passport = require ('passport')
const router = express.Router()
const products = require('../services/database')


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

//user login
router.post('/user/login', passport.authenticate('user-strategy', {session: false}), async (req, res)=>{
    try{
        const user= req.user
        const token = jwt.signUser(req.user)
        res.json({token: token, user: req.user})
    } catch (e){
        console.log(e)
        res.status(403).send('email or password is incorrect')
    }
})

module.exports = router