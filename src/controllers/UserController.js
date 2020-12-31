const knex = require('../databases')
const bcrypt = require('bcrypt')


module.exports = {
   async index(req, res) {
            const result =  await knex('users')
            .where('deleted_at' , null)

            return res.json(result)
    },
    async create(req, res) {
        const {email,password} = req.body;

    let hash = bcrypt.hashSync(password,10)
      try {
           await knex('users').insert({
               email,
               password : hash
            })

            return res.json("Cadastro Efetuado com Sucesso!")
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