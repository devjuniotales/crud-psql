const knex = require('../databases')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthConfig = require('../config/auth.json')

module.exports = {
   async authenticate(req, res) {
       const {email,password} = req.body;

            const [user] =  await knex('users')
            .where({email})
            .select('users.email','users.password')
            
            if(!user || null){
                 res.status(401).send({error : 'Email não cadastrado!'})
            }

            const userValidPassword = await bcrypt.compareSync(password,user.password)

            if(!userValidPassword){
                res.status(401).send({error: "Usuário ou senha inválido"})
            }

            const token = jwt.sign({id: user.id}, AuthConfig.secret ,{expiresIn : '1d'})

            res.json({
                user,
                token
            })
}
}