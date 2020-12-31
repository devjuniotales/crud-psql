const bcrypt = require('bcrypt')


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email : 'g@g',
        password : '123'
        },
      ]);
    });
};
