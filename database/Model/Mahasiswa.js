const { model } = require('mongoose')
const MahassiwaSchema = require('../Schema/Mahasiswa.js')
const MahasiswaModel =  model("mahasiswa", MahassiwaSchema, 'mahasiswa')

module.exports = MahasiswaModel