const { model } = require('mongoose')
const Crypt = require('crypto')
const UserSchema = require('../Schema/User.js')

UserSchema.methods.setpass = function(pass) {
    this.salt = Crypt.randomBytes(16).toString('hex')

    this.password = Crypt.pbkdf2Sync(pass, this.salt, 1000,64, 'sha512').toString('hex')
}

UserSchema.methods.validPass = (pass, user) => {
    var hash = Crypt.pbkdf2Sync(pass, user.salt,1000,64,'sha512').toString('hex')
    return user.password == hash
}

const UserModel =  model("user", UserSchema, 'user')

module.exports = UserModel