exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { id: 1, user_name: 'couryp', full_name: 'pat McPAttyson', avatar_image: 'https://avatars.githubusercontent.com/u/28018676?' },
        { id: 2, user_name: 'ccawley', full_name: 'Curtis Cawley', avatar_image: 'https://avatars.githubusercontent.com/u/25617861?' }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
      )
    })
}
