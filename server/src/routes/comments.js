const { postComment, getComments } = require('../controllers/comment')
const auth = require('../middlewares/auth')

const router = require('express').Router()

router.post('/add', auth, postComment)
router.get('/get', auth, getComments)

module.exports = router