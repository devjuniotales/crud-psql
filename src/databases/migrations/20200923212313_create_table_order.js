const { onUpdateTrigger } = require("../../../knexfile")

exports.up = async  knex => knex.schema.createTable('order', table => {
    table.increments('id')
    table.text('title')
  

    table.integer('user_id')
    .references('users.id')
    .notNullable()
    .onDelete('CASCADE')

    table.timestamps(true,true)

}).then(() => knex.raw(onUpdateTrigger('order'))) 

exports.down = async  knex => knex.schema.dropTable('order')