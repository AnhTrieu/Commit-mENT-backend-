const express = require('express')
const router = express.Router()
const {AuthController} = require('../controllers')


router.post('/', AuthController.prepParams)


module.exports = router
