const db = require("../db/postgres");

const getNewsByID = async (id) => {
  try {
    const result = await db.query(
      "SELECT ln.article_id, ln.title, ln.content, ln.image_url, ln.city, ln.country, ln.username, ln.created_at, users.name AS author_name, array_agg(local_tags.tag_name) AS tags FROM local_news ln LEFT JOIN users ON ln.username = users.username LEFT JOIN local_news_tags ON ln.article_id = local_news_tags.article_id LEFT JOIN local_tags ON local_news_tags.tag_id = local_tags.tag_id WHERE ln.article_id = $1 GROUP BY ln.article_id, author_name",
      [id]
    );

    return result[0];
  } catch (error) {
    throw error;
  }
};

const addNews = async (
  title,
  content,
  image_url,
  city,
  country,
  username
) => {
  try {
    const result = await db.query(
      "INSERT INTO local_news (title, content, image_url, city, country, username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, content, image_url, city, country, username]
    );

    return result[0];
  } catch (error) {
    throw error;
  }
};

const getNewsByLocality = async (city, page = 1) => {
  try {
    const limit = 10;
    const offset = (page - 1) * limit;

    const result = await db.query(
      "SELECT local_news.*, users.name AS author_name, array_agg(local_tags.tag_name) AS tags FROM local_news LEFT JOIN users ON local_news.username = users.username LEFT JOIN local_news_tags ON local_news_tags.article_id = local_news.article_id LEFT JOIN local_tags ON local_tags.tag_id = local_news_tags.tag_id WHERE city=$1 GROUP BY local_news.article_id, users.name ORDER BY created_at DESC LIMIT $2 OFFSET $3",
      [city, limit, offset]
    );

    return result;
  } catch (error) {
    throw error;
  }
};

const updateNewsById = async (id, title, content, image_url, city, country) => {
  try {
    const result = await db.query(
      "UPDATE local_news SET title=$2, content=$3, image_url=$4, city=$5, country=$6 WHERE article_id=$1 RETURNING *",
      [id, title, content, image_url, city, country]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteNewsById = async (id) => {
  try {
    const result = db.query(
      "DELETE FROM local_news WHERE article_id=$1 RETURNING *",
      [id]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getNewsByID,
  addNews,
  getNewsByLocality,
  updateNewsById,
  deleteNewsById,
};
