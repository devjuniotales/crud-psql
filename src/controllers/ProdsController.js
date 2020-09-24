const knex = require("../databases")


module.exports = {
    async index (req, res) {
        const {page = 1} = req.query;

        const query = knex('prods')
        .limit(5)
        .offset((page - 1) * 5)
        .select('prods.*')
        const countObj = knex('prods').count()

         const [count] = await countObj   
        res.header('x-total-count', count['count'])
        
        const result = await query


        res.json(result)
    },
    async create ( req, res) {
        const {
            nameProd,
            uniProd,
            descProd,
            priceProd,
            statusProd,
            payProd
            } = req.body; 

        await knex('prods').insert({
            nameProd,
            uniProd,
            descProd,
            priceProd,
            statusProd,
            payProd
        })
        res.json('ok')
    }
}
