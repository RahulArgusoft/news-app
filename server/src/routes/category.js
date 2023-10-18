const router = require('express').Router()
const { fetchCategories } = require('../controllers/news-categories')

router.get('/', fetchCategories)

module.exports = router