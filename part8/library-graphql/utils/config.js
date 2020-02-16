require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let SECRET = process.env.SECRET
let BCRYPT_SALT_ROUNDS = 10

if (process.env.NODE_ENV === 'test') {
    // setup variables for test environment
}

module.exports = {
    MONGODB_URI,
    SECRET,
    BCRYPT_SALT_ROUNDS
}
