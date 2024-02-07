const LocalStrategy = require('passport-local').Strategy
const database = require('../services/database')

const options = {usernameField: 'email'}

const adminStrategy = new LocalStrategy(options, async(email, password, done) => {
    try {
        const admin = await database.findAdmin({email, password})
        done(null, admin)
    } catch (e) {
        done(e)

    }
})
const userStrategy = new LocalStrategy(options, async(email, password, done) => {
    try {
        const user = await database.findUser({email, password})
        done(null, user)
    } catch (e) {
        done(e)

    }
})



module.exports = {
    userStrategy,
    adminStrategy
}
