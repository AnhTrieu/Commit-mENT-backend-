const { Commit } = require('../models')
const axios = require('axios')

class CommitsController {
  constructor() {}

  static index (req, res, next) {
    let { limit, offset } = req.query
    Commit.index(limit, offset)
      .then(commits => res.status(200).send(commits))
      .catch(console.error)
  }

  static userCommits (req, res, next) {

    Commit.userCommits(req.params.username)
      .then(commits => res.json({ commits }))
      .catch(console.error)
  }

  static create (req, res, next) {
      let token = req.body.token
      let header = {Authorization: `token ${token}`}
      axios.get(`https://api.github.com/user/repos?affiliation=owner`, { headers : header })
        .then(result => result.data.map(repo => repo.full_name))
        .then(bfa => {
          let username = bfa[0].split('/')[0]
          let promises = bfa.map(e => {
            return axios.get(`https://api.github.com/repos/${e}/commits`, { headers : header })
              .then(result => {
                let filteredData = []
                for (var i = 0; i < result.data.length; i++) {
                  if (result.data[i].author.login === username) {
                    filteredData.push(result.data[i])
                  }
                }
                return filteredData.map(commit => {
                  let user_name = commit.author.login
                  let createdAt = commit.commit.committer.date
                  let message = commit.commit.message
                  let sha = commit.sha
                  return {createdAt, message, user_name,sha}
                })
              })
              .catch(console.error)
          })
          Promise.all(promises)
            .then(data => {
              Commit.createCommits(data)
              .then(commits => { res.status(200).send(commits) })
            })
            .catch(console.error)
        })
        .catch(console.error)
    }
}


module.exports = CommitsController
