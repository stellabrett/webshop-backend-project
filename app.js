const express = require('express')
const app = express()
const register = require('./router/register')
const passport = require('passport')
const products = require('./router/products')
const orders= require('./router/orders')
const admins = require('./router/admins')
const login = require('./router/login')
const LocalStrategy = require('./strategies/localStrategy')
const JwtStrategy = require('./strategies/jwtStrategy')
const doff = require('./models/product_order')
//const doffi = require('./models/categories')
//const user = require('./router/user')



app.use(express.json())
app.use(passport.initialize())

passport.use('user-strategy', LocalStrategy.userStrategy)
passport.use('admin-strategy', LocalStrategy.adminStrategy)

passport.use('jwt', JwtStrategy)

app.use('/api', register)
app.use('/api', products)
app.use('/api', admins)
app.use('/api', orders)
app.use('/api', login)
//app.use('/api', user)




app.listen(3000, () =>{
    console.log('Express APP run on http://localhost:3000')
})