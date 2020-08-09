const knex = require("..");

exports.up = knex => knex.schema.createTable('users', table => {
    table.increment('id')

    table.text('username').unique().notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('created_at').defaultTo(knex.fn.now())

}) 

exports.down = knex => knex.schema.dropTable('users')
  
