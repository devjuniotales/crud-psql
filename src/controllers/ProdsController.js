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
    },
    async delete (req, res) {
        const {id} = req.params;

        await knex('prods')
        .where({id})
        .del()
        
        return res.status(200).send('deletado')
    },
    async update (req, res) {
        const {id} = req.params;
        const {
            nameProd,
            uniProd,
            descProd,
            priceProd,
            statusProd,
            payProd
        }=req.body;

        try {
        await knex('prods')
        .update({
            nameProd,
            uniProd,
            descProd,
            priceProd,
            statusProd,
            payProd
        })
        .where({id})
        res.status(200).send('Produto atualizado')
    } catch (error) {
        res.status(401).send('Error...')
        console.log(error)
    }
        

    }
}
