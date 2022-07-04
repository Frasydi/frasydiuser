const Mongoose = require("mongoose")

const MahassiwaSchema = new Mongoose.Schema({
    nama : String,
    nim : String,
    provinsi : String,
    kabkota : String,
    tanggal_lahir : String,
    no_hp : String,
})

module.exports = MahassiwaSchema