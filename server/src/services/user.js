const db = require('../db/postgres')

const addUserToDatabase = async (username, password, email = '') => {
    const result = await db.query('INSERT into users (username, password, email) values ($1, $2, $3) RETURNING *', [username, password, email])
    return result[0]
}

const addTokenToDB = async (uid, token) => {
    await db.query('INSERT into  tokens (uid, token) values ($1, $2)', [uid, token])
}

const fetchTokenFromDB = async (uid) => {
    const result = await db.query('SELECT token from tokens where uid = $1', [uid])
    return result[0]?.token
}

const fetchAllUserTokensFromDB = async (uid) => {
    const result = await db.query('SELECT token from tokens where uid = $1', [uid])
    return result
}

const removeTokenFromDB = async (uid, token) => {
    const result = await db.query('delete from tokens where uid = $1 and token = $2 RETURNING *', [uid, token])
    return result
}

const removeAllUserTokensFromDB = async (uid) => {
    const result = await db.query('delete from tokens where uid = $1 RETURNING *', [uid])
    return result
}

const fetchUserFromDB = async (username) => {
    try {
        const result = await db.query('SELECT * from users where username = $1', [username])
        return result[0]
    } catch (error) {
        throw error
    }
}

const fetchUserWithUsernameAndPassword = async (username, password) => {
    const result = await db.query('SELECT * from users where username = $1 and password = $2', [username, password])
    return result[0]
}

module.exports = {
    addUserToDatabase,
    addTokenToDB,
    fetchTokenFromDB,
    fetchAllUserTokensFromDB,
    fetchUserFromDB,
    fetchUserWithUsernameAndPassword,
    removeTokenFromDB,
    removeAllUserTokensFromDB
}