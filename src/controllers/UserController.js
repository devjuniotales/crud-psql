
const knex = require('../databases')


module.exports = {
   async index(req, res) {
            const result =  await knex('users')
            .where('deleted_at' , null)

            return res.json(result)
    },
    async create(req, res) {
        const {username} = req.body;

      try {
           await knex('users').insert({
                username
            })
    
            return res.json(result)
      } catch (error) {
          res.status(400).send(error)
      }
    },
    async update(req,res) {
            const {id} = req.params
            const {username} = req.body;

        try {
             await knex('users')
            .update({username})
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