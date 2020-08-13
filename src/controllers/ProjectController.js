const knex = require("../databases")

module.exports = {
    async index (req, res) {
        const {user_id, page = 1} = req.query;

        const query = knex('projects')
        .limit(5)
        .offset((page - 1) * 5)
        const countObj = knex('projects').count()

        if(user_id){
            query
            .where({user_id})
            .join('users', 'users.id', '=' ,'projects.user_id')
            .select('projects.*', 'users.username')

            countObj
            .where({user_id})
        }

         const [count] = await countObj   
        res.header('x-total-count', count['count'])
        
        const result = await query


        res.json(result)
    },
    async create ( req, res) {
        const {user_id , title} = req.body; 

        await knex('projects').insert({
            user_id,
            title
        })
        res.json('ok')
    }
}