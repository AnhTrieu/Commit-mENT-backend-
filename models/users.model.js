const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')


class User {
  constructor() {}

  static index() {
    return knex('users')
  }

  static pullProfile({token}) {
    return axios.get(`https://api.github.com/user`, {headers: { Authorization: `token ${token}` } })
      .then(result => {
        return {
          full_name: result.data.name,
          user_name: result.data.login,
          avatar_image: result.data.avatar_url
        }
      })
      .catch(console.error)
  }

  static getUser(username) {
    return knex('users')
      .where({ user_name: username})
      .first()
      .then(match => match)
      .catch(console.error)
  }

  static createUser(newUser) {
    return knex('users')
      .insert(newUser)
      .then(() => {
        return knex('users')
          .where({user_name: newUser.user_name})
          .first()
          .then(result => result)
      })
      .catch(console.error)
  }

}

module.exports = User
