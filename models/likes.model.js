const db = require('../db/knex.js')
const knex = require('../db/knex')

class Like {
  constructor () {}

  static index () {
    return knex('users_likes')
  }

  static getOne (id) {
    return knex('users_likes')
      .select('commit_id')
      .where('commit_id', '=', id)
      .count('commit_id')
      .groupBy('commit_id')
  }

  static leaders () {
    return knex('users_likes')
      .count('commit_id')
      .select('commit_id')
      .orderBy('count', 'desc')
      .groupBy('commit_id')
      .then(array => {
        let ids = array.slice(0,5).map(commit => {
          let id = parseInt(commit.commit_id)
          let count = parseInt(commit.count)
          return knex('commits')
            .where('commits.id', '=', id)
            .innerJoin('users', 'commits.user_id', 'users.id')
            .first()
            .select('user_id', 'message', 'created_on', 'sha', 'user_name', 'full_name', 'avatar_image', {count})
        })
        return Promise.all(ids)
      })
  }

  static addOrRemoveLike (newLike) {
    return knex('users_likes')
      .where(newLike)
      .first()
      .then(result => {
        if (!result) {
          return knex('users_likes')
            .insert(newLike)
        } else {
          return knex('users_likes')
            .where(newLike)
            .del()
        }
      })
      .then(() => {
        return knex('users_likes')
          .where({ commit_id: newLike.commit_id })
          .count()
      })
      .catch(console.error)
  }

}

module.exports = Like
