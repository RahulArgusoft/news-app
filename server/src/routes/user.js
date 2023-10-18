const router = require('express').Router()
const {registerUser, loginUser, logoutUser, logoutAllUser } = require('../controllers/user')
const auth = require('../middlewares/auth')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/logout', auth, logoutUser)

router.post('/logout/all', auth, logoutAllUser)

module.exports = router