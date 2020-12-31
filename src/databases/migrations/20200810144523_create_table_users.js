const { onUpdateTrigger } = require("../../../knexfile")


exports.up = async knex => knex.schema.createTable('users', table => {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"))

    table.text('email').unique().notNullable()
    table.string('password').notNullable()
    
    table.timestamps(true, true)

}).then(() => knex.raw(onUpdateTrigger('users'))) 

exports.down = async knex => knex.schema.dropTable('users')
  
