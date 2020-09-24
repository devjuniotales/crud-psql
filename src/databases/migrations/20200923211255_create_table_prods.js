const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async  knex => knex.schema.createTable('prods', table => {
    table.increments('id')
    table.text('nameProd')
    table.integer('uniProd')
    table.text('descProd')
    table.integer('priceProd')
    table.text('statusProd')
    table.text('payProd')


    table.timestamps(true,true)

}).then(() => knex.raw(onUpdateTrigger('prods'))) 

exports.down = async  knex => knex.schema.dropTable('prods')