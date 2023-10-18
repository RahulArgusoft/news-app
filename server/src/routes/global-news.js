const router = require('express').Router()
const { getNews,getNewsByCategory } = require('../controllers/global-news')

router.get('/', getNews)

router.get('/:category', getNewsByCategory)

module.exports = router