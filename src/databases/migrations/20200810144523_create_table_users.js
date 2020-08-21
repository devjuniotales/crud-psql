const { onUpdateTrigger } = require("../../../knexfile")


exports.up = async knex => knex.schema.createTable('users', table => {
    table.increments('id')

    table.text('username').unique().notNullable()

    table.timestamps(true, true)

}).then(() => knex.raw(onUpdateTrigger('users'))) 

exports.down = async knex => knex.schema.dropTable('users')
  
