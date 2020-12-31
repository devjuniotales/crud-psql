const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')


// vai fazer validação do token para poder acessar o restante do backend//

module.exports = (req , res, next) => {
    
    const authHeader = req.headers.authorization 

   if(!authHeader)
   return res.status(401).send({error : " No token provided"}) 
 
    // vai separar token duas partes //
    const parts  = authHeader.split(' ')

    if(!parts.lenght ===2)
    return res.status(401).send({error : 'token Error'})


    const [ scheme , token] = parts

    if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({error : 'Token Malformated'})

    jwt.verify(token, authConfig.secret, (err , decode) => {
        if(err) return res.status(401).send({ error : "Token Invalid"})

        req.userId = decode.id
        return next()
    })

}