const db = require("../db/postgres");

const postComment = async (text, parent_id, user_id, article_id) => {
  try {
    const result = await db.query(
      "INSERT INTO comments (text, parent_id, user_id, article_id) values ($1, $2, $3, $4) RETURNING *",
      [text, parent_id, user_id, article_id]
    );

    return result;
  } catch (error) {
    throw error;
  }
};

const getComments = async (article_id, parent_id) => {
    try {
      const parent_id_query = parent_id ? "C.parent_id = $2" : "C.parent_id is null";
      const parameters = [article_id];
  
      if (parent_id) {
        parameters.push(parent_id);
      }
  
      const result = await db.query(`WITH ReplyCounts AS ( SELECT parent_id, COUNT(*) as count FROM comments WHERE parent_id IS NOT NULL GROUP BY parent_id ) SELECT C.*, U.name, COALESCE(RC.count, 0) as total_replies FROM comments C LEFT JOIN users U ON C.user_id = U.uid LEFT JOIN ReplyCounts RC ON C.id = RC.parent_id WHERE C.article_id = $1 AND ${parent_id_query} ORDER BY C.created_at DESC`, parameters);
  
      return result
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  

module.exports = {
  postComment,
  getComments,
};
