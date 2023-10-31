const router = require('express').Router()
const { getAllTags } = require('../controllers/local-tags')


router.get('/', getAllTags)

module.exports = router