const knex = require('../databases')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const mailer = require('../config/mailer')


module.exports = {
   async index(req, res) {
            const result =  await knex('users')
            .where('deleted_at' , null)

            return res.json(result)
    },
    async create(req, res) {
        const {email,password} = req.body;

    const token = crypto.randomBytes(3).toString('hex')

    let hash = bcrypt.hashSync(password,10)
      try {
           await knex('users').insert({
               email,
               password : hash
            })

            
            res.json("Cadastro Efetuado com Sucesso!")

            mailer.sendMail({
                to : email,
                from : "globizcf@gmail.com",
                subject : 'Seja bem vindo!',
                text : `Cadastro realizado com sucesso!`,
            }, (err) => {
                if(err){
                    console.log(err)
                    res.status(400).send({error : 'Cannot email'})
                }
            })
      } catch (error) {
          res.status(400).send(error)
      }
    },
    async update(req,res) {
            const {id} = req.params;
            const {email , password} = req.body;

        try {
             await knex('users')
            .update({
              email , password
            
            })
            .where({id})

            return res.send('ok')

        } catch (error) {
             return res.status(400)
        }
    },
    async delete(req,res){
        const {id} =req.params

        try {
           await knex('users')
            .where({id})
            .update('deleted_at' , new Date)
            return res.send('ok')
        } catch (error) {
            
        }
    }

}