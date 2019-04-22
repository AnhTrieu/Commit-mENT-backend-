exports.seed = function(knex, Promise) {
  return knex('users_likes').del()
    .then(function () {
      return knex('users_likes').insert([
        { id: 1, user_id: 1, commit_id: 11 },
        { id: 2, user_id: 2, commit_id: 2 },
        { id: 3, user_id: 2, commit_id: 4 },
        { id: 4, user_id: 2, commit_id: 5 },
        { id: 5, user_id: 2, commit_id: 6 },
        { id: 6, user_id: 2, commit_id: 10 },
        { id: 7, user_id: 1, commit_id: 13 }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_likes_id_seq', (SELECT MAX(id) FROM users_likes));`
      )
    })
}
