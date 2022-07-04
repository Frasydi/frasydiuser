const {Schema} = require('mongoose')

const User = new Schema({
    username : String,
    password : String,
    role : String,
    salt : String
})

module.exports = User