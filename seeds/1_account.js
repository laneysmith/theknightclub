exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('account').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('account').insert({username: 'pawel', password: 'password1'}),
        knex('account').insert({username: 'evenbford', password: 'password2'}),
        knex('account').insert({username: 'justbennett', password: 'password3'})
      ]);
    });
};
