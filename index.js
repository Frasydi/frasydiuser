require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors")
const Mahasiswa = require('./Router/Mahasiswa.js')
const User = require('./Router/User.js')
const bodyparser = require('body-parser')
const port = process.env.PORT || 4000
console.log("Ada Request")
app.use(express.json())
app.use(cors({
    origin : "*"
}))
app.use(bodyparser.json())
app.use("/mahasiswa", Mahasiswa)
app.use("/user", User)


app.get("/", (req,res) => {
    res.status(200).send("Hello World")
})


app.listen(port, (port) => {
    console.log("Berjalan di port "+port)
})