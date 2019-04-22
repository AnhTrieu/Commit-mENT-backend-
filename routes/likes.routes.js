const express = require('express')
const router = express.Router()
const { LikesController } = require('../controllers')


router.get('/', LikesController.index)
router.get('/lead', LikesController.leaders)
router.get('/:id', LikesController.getOne)
router.post('/', LikesController.addOrRemoveLike)


module.exports = router
