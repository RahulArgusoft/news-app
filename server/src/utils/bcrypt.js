const bcrypt = require('bcrypt')

const hashPassword = async (pass) => {
    const hashedPassword = await bcrypt.hash(pass, 8)
    return hashedPassword
}

const verifyPassword = async (password, hashedPassword) => {
    const isMatch = bcrypt.compare(password, hashedPassword)
    return isMatch
}

module.exports = {
    hashPassword,
    verifyPassword
}