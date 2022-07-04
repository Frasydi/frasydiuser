const jwt = require('jsonwebtoken')

const tokenauth = (req, res, next) => {
    const Header = req.headers['authorization']
    const token = Header && Header.split(' ')    
    console.log(token)
    if(token == null||token.length <= 1) {
        res.status(401).send("You are not auth")
        return
    }
    console.log(token[0] != "Sandi")
    if(token[0] != "Sandi") {
        res.status(401).send("You are not auth")
        return
    }
    jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).send("Your are not auth")
        req.user = user
        next()
    }) 
}
module.exports = tokenauth
