const jwt = require('jsonwebtoken')
const key = process.env.JWT_SECRET

const generateToken = (payload) =>  jwt.sign({ uid: payload.uid, username: payload.username, userLocation: { city: payload.city, country: payload.country } }, key)

const verifyToken = (token) => jwt.verify(token, key)


module.exports = {
    generateToken,
    verifyToken
}