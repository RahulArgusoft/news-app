const db = require('../db/postgres')

const addNewsTags = async (tag_id, news_id) => {
    try {
        const result = await db.query('INSERT INTO news_tags (tag_id, news_id) values ($1, $2) returning *', [tag_id, news_id])
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    addNewsTags
}