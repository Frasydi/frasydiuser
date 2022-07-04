const Mongoose = require('mongoose')
const Mahasiswa = require("../Model/Mahasiswa.js")
const url = process.env.DATABASE_URL
const getAll = async() => {
    try {
        await Mongoose.connect(url)
        const result = await Mahasiswa.find({}).sort({nama : 1})
        return {
            status : 200,
            msg : result
        }
    }finally {
        Mongoose.connection.close()
    }
}

const getNim = async (nim) => {
    try {
        await Mongoose.connect(url)
        if(nim.length < 12) {
            return {
                status : 400,
                msg : "NIM are not inserted"
            }
        }
        const result = await Mahasiswa.findOne({nim:nim})
        if(result == {}) {
            return {
                status : 404,
                msg : "NOT FOUND"
            }
        }
        return {
            status : 200,
            msg : result
        }

    }finally {
       await Mongoose.connection.close()
    }
}

exports.getAll = getAll
exports.getNim = getNim