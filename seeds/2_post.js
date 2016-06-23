exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
  .then(function() {
    return knex('account').select('id');
  })
  .then(function (accounts) {
    console.log(accounts);
    return Promise.all([
      // Inserts seed entries
      knex('post').insert({title: 'Hi!', image: 'https://s-media-cache-ak0.pinimg.com/236x/c0/14/23/c014230dec32c2eeb133b7b8da072317.jpg', content: 'blah blah blah', account_id: accounts[0].id}),
      knex('post').insert({title: 'Birds', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Sunny_day_in_the_Bradford_City_Park.JPG', content: 'asd fsdf asdf dfasf e adfsd asd f ', account_id: accounts[1].id}),
      knex('post').insert({title: 'I am a knight', image: 'http://assets.rollingstone.com/assets/images/artists/tony-bennett.jpg', content: 'adsfpoidas od poipopid sp dsfasd flore Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Loremloremmlorem Lorem', account_id: accounts[2].id})
    ]);
  });
};
