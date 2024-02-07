const express = require('express')
const router = express.Router()
const database = require('../services/database')


// user register
router.post('/register', async (req,res)=> {
    try{
        const user = await database.createUsers(req.body)
        res.status(200).send('successful')
    }catch (e) {
        if(e.name === 'SequelizeValidationError') {
            res.send(e.message)
        }else{
            console.log(e)
            res.status(401).send('register failed')
        }

    }

})

module.exports = router