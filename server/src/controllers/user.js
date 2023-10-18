const {generateToken} = require('../utils/jwt-token')
const db = require('../services/user')
const { verifyPassword, hashPassword } = require('../utils/bcrypt')



const registerUser = async (req, res) => {
    try {

        const user = req.body
        const hashedPassword = await hashPassword(user.password)
        const result = await db.addUserToDatabase(user.username, hashedPassword, user?.email)
        
        const token = generateToken(result)
        await db.addTokenToDB(result.uid, token)
        
        delete result.password
        req.user = result
        req.token = token
    
        res.status(201).send({ result, token})
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const userData = req.body
        
        console.log(userData);
        // true if username is present in database. returns userdata from database
        const user = await db.fetchUserFromDB(userData.username)
        if(!user) {
            throw new Error('invalid credentials!')
        }


        // verifies the password provided by user with hashed password stored in database
        const isPasswordCorrect = await verifyPassword(userData.password, user.password)
        if(!isPasswordCorrect) {
            throw new Error('invalid password!')
        }

        const token = generateToken(user)
        await db.addTokenToDB(user.uid, token)

        delete user.password

        req.user = user;
        req.token = token;
        res.status(200).send({ user, token })

    } catch (err) {
        res.status(400).send({ error: err.message})
    }
}

const logoutUser = async (req, res) => {
    try {
        const userData = req.user;
        const token = req.token;

        const result = await db.removeTokenFromDB(userData.uid, token)

        res.send({ status: 'logged out!', userData, token })

        
    } catch (error) {
        console.log(error.message);
    }
}

const logoutAllUser = async (req, res) => {

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    logoutAllUser
}