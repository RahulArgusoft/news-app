const db = require('../db/postgres')


const addNewsCategoriesToDB = async (tags) => {
    const query = tags.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`).join(', ')
    const params = tags.flatMap( item => Object.values(item))
    await db.query('INSERT into categories (tag_id, tag_name, tag_url) values '+ query, params)
    return
}

const fetchNewsCategoriesFromDB = async () => {
    const data = await db.query('SELECT * from categories');
    return data
}

const updateCategoriesTotalPage = async (tag_id, total_page) => {
    await db.query('UPDATE categories SET total_page = $1 WHERE tag_id = $2', [total_page, tag_id])
}

const updateCategoriesCurrentPage = async (tag_id, currnet_page) => {
    await db.query('UPDATE categories SET current_page = $1 WHERE tag_id = $2', [currnet_page, tag_id])
}

const fetchCurrentPage = async (tag_id) => {
    page = await db.query('SELECT current_page from categories where tag_id = $1', [tag_id])
    return page
}

module.exports = {
    addNewsCategoriesToDB,
    fetchNewsCategoriesFromDB,
    updateCategoriesTotalPage,
    updateCategoriesCurrentPage,
    fetchCurrentPage
}