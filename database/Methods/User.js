const mongoose = require('mongoose')
const User = require('../Model/UserModel.js')
const url = process.env.DATABASE_URL2
async function register(user,password) {
    try {
        await mongoose.connect(url)
        if(await User.exists({username:user})) {
            return {
                status : 400,
                msg : "username ini sudah ada"
            }
        }
        const newUser = new User()
        newUser.username = user
        newUser.password = password
        newUser.setpass(password)

        const save = await newUser.save()
        if(save.errors) {
            return {
                status : 500,
                msg : "Error"
            }
        }
        return {
            status : 201,
            msg : "User Added"
        }
    }finally {
        await mongoose.connection.close()
    }
}
async function login(user, password) {
    try {
        await mongoose.connect(url)
        const res = await User.findOne({username:user})
        if(res == null) {
            return {
                status : 404,
                msg : "USER NOT FOUND"
            }   
        }
        if(res.validPass(password, res)) {
            return {
                status : 200,
                msg : "LOGIN"
            }
        }
        return {
            status : 400,
            msg : "WRONG PASSWORD"
        }
    }finally {
        await mongoose.connection.close()
    }
}

exports.register = register
exports.login = login