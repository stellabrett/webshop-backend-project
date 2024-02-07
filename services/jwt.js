const jwt = require('jsonwebtoken')
const JWT_SECRET = 'DasDaKey'
const JWT_EXPIRE_IN = '31d'

function signAdmin(user){
    return jwt.sign({
        sub:user.id,
        email: user.email
    }, JWT_SECRET, {expiresIn: JWT_EXPIRE_IN})

}

function signUser(user){
    return jwt.sign({
        sub: user.id,
        email: user.email
    }, JWT_SECRET, {expiresIn: JWT_EXPIRE_IN})
}

module.exports = {
    signUser,
    signAdmin,
    JWT_SECRET,
    JWT_EXPIRE_IN
}