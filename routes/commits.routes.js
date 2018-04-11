const express = require('express')
const router = express.Router()
const { CommitsController } = require('../controllers')


router.get('/', CommitsController.index)
router.get('/:username', CommitsController.userCommits)
router.post('/', CommitsController.create)


module.exports = router
