const JwtStrategy = require('passport-jwt').Strategy
const jwtExtractor = require('passport-jwt').ExtractJwt
const jwt = require('../services/jwt')

const options = {
    jwtFromRequest: jwtExtractor.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt.JWT_SECRET
}

// jwt = payload probiert
const strategy = new JwtStrategy(options, (jwt, done) => {

    const user = {id: jwt.sub, email: jwt.email} // id: jwt.sub
    done(null, user)
    console.log(user)
})


module.exports = strategy
