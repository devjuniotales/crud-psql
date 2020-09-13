
const knex = require('../databases')


module.exports = {
   async index(req, res) {
            const result =  await knex('users')
            .where('deleted_at' , null)

            return res.json(result)
    },
    async create(req, res) {
        const {email,name,phone, password,address,number,zipcode, country} = req.body;

      try {
           await knex('users').insert({
               email,
               name,
               password,
               address,
               phone,
               number,
               zipcode,
               country
            })

            return res.json("Cadastro Efetuado com Sucesso!")
      } catch (error) {
          res.status(400).send(error)
      }
    },
    async update(req,res) {
            const {id} = req.params;
            const {name,tel, email , password, address, number,zipcode,country} = req.body;

        try {
             await knex('users')
            .update({
                name,tel, email , password, address, number,zipcode,country
            
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