const {Token} = require('../models')

class AuthController {
  constructor() {}

  static prepParams(req, res, next) {
    let {code, state} = req.query
    let params = {
      client_id:process.env.CLIENT_ID,
      client_secret:process.env.CLIENT_SECRET,
      code: code,
      redirect_uri: 'http://commit-m.surge.sh',
      state: state
    }
    Token.tokenExchange(params)
      .then(data => {
        res.status(200).send(data)
      })
      .catch(console.error)
  }
}


module.exports = AuthController
