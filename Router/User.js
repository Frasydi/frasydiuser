const express = require('express')
const router = express.Router()
const {login, register} = require('../database/Methods/User.js')
const jwt = require('jsonwebtoken')

router.post('/register', (req,res) => {
    const {username, password} = req.body
    if(username == null || password == null) {
        res.status(400).send("username or password cant be empty")
        return
    }
    register(username, password).then(el => {
        res.status(el.status).send(el.msg)
    }).catch(error => {
        console.log(error)
        res.status(400).send("TIME OUT")
    })
})


router.post('/login', (req,res) => {
    const {username, password} = req.body
    if(username == null || password == null) {
        res.status(400).send("username or password cant be empty")
        return
    }
    
    login(username, password).then(el => {
        
        const accesstoken = jwt.sign({name:username}, process.env.ACCESS_TOKEN_SECRET)
        if(el.status >= 400) {
            res.status(el.status).send(el.msg)
            return
        }
        res.json({msg : el.msg,accesstoken:accesstoken})

    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

module.exports = router