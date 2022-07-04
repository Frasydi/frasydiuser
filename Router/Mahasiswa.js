const express = require('express')
const router = express.Router()
const {getAll, getNim} = require("../database/Methods/Mahasiswa.js")
const tokenauth = require('../Util/Tokenauth.js')

router.get("/all", tokenauth,(req,res) => {
    getAll().then(data => {
        res.status(data.status).json(data.msg)
    }).catch(error => {
        console.log(error)
        res.status(400).send("TIME OUT")
    })
    
}) 

router.get("/nim/:nim", tokenauth,(req,res) => {
    const {nim} = req.params
    if(nim == null || nim.length < 12 || nim == "") {
        res.status(400).send("NIM is not valid")
        return
    }
    getNim(nim).then(data => {
        res.status(data.status).json(data.msg)
    }).catch(err => {
        console.log(err)
        res.status(400).send(`TIME OUT`)
    })
})

module.exports = router