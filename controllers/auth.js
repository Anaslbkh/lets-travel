//for giving each user an separated session
let jwt = require('jsonwebtoken');
const { model } = require('mongoose');
let secret = 'gew67dfgew'
function generateToken(user) {
    let payload = {
        email: user.email,
        password: user.password
    }
    return jwt.sign(payload, secret);
}
function checkToken(token) {
    return jwt.verify(token, secret);
}
module.exports = { generateToken, checkToken };