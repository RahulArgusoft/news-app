const db = require("../db/postgres");
const modifyDate = require("../utils/modify-date");

const addNewsToDatabase = async (news) => {
  news.created_at = modifyDate(news.created_at);
  try {
    const result = await db.query(
      "INSERT into news (article_id, title, content, author_name, image_url, source_url, created_at, source_name) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        news.hash_id,
        news.title,
        news.content,
        news.author_name,
        news.image_url,
        news.source_url,
        news.created_at,
        news.source_name,
      ]
    );
    if (result) {
      return true;
    }
  } catch (err) {
    console.log(err.message);
  }

  return false;
};

const fetchNewsFromDB = async (page = 1) => {
  try {
    const limit = 10;
    const offset = (page - 1) * limit;

    const news_data = await db.query(
      "SELECT n.article_id, n.title, n.content, n.author_name, n.image_url, n.source_url, n.created_at, n.source_name, JSON_AGG(JSON_BUILD_OBJECT('tag_id', c.tag_id, 'tag_name', c.tag_name)) AS tags FROM news n LEFT JOIN news_tags nt ON n.article_id = nt.news_id LEFT JOIN categories c ON nt.tag_id = c.tag_id GROUP BY n.article_id, n.title, n.content, n.author_name, n.image_url, n.source_url, n.created_at, n.source_name ORDER BY n.created_at DESC LIMIT $1 OFFSET $2;",
      [limit, offset]
    );
    return news_data;
  } catch (error) {
    throw err;
  }
};

const fetchNewsByCategory = async (tag, page = 1) => {
  try {
    const limit = 10;
    const offset = (page - 1) * limit;
    const old_query = "SELECT n.article_id, n.title, n.content, n.author_name, n.image_url, n.source_url, n.created_at, n.source_name FROM news n JOIN news_tags nt ON n.article_id = nt.news_id WHERE nt.tag_id = $1 ORDER BY n.created_at DESC LIMIT $2 OFFSET $3"

    const news_data = await db.query(
      "SELECT MAX(n.article_id) AS article_id, n.title, n.content, n.author_name, n.image_url, n.source_url, n.source_name, n.created_at, json_agg(json_build_object('tag_id', t.tag_id, 'tag_name', t.tag_name)) AS tags FROM news n JOIN news_tags nt ON n.article_id = nt.news_id JOIN categories c ON nt.tag_id = c.tag_id LEFT JOIN news_tags ntt ON n.article_id = ntt.news_id LEFT JOIN categories t ON ntt.tag_id = t.tag_id WHERE c.tag_id = $1 GROUP BY n.title, n.content, n.created_at, c.tag_id, c.tag_name, n.author_name, n.source_name, n.source_url, n.image_url ORDER BY n.created_at DESC LIMIT $2 OFFSET $3;",
      [tag, limit, offset]
    );
    return news_data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = {
  addNewsToDatabase,
  fetchNewsFromDB,
  fetchNewsByCategory,
};
