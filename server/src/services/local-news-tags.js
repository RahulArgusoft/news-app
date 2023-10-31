const db = require("../db/postgres");

const addLocalNewsTags = async (newsId, tag_list) => {
  try {
    
    const result = await db.query(
      "INSERT INTO local_news_tags (article_id, tag_id) SELECT $1, unnest($2::int[]) ",
      [newsId, tag_list]
    );

    return true;
  } catch (error) {
    throw error;
  }
};

const getLocalNewsTags = async (newsId) => {
  try {
    const result = await db.query(
      "SELECT article_id, tag_id from local_news_tags WHERE article_id = $1",
      [newsId]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addLocalNewsTags,
  getLocalNewsTags,
};
