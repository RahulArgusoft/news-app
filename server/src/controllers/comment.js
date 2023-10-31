const CommentService = require("../services/comments");

const postComment = async (req, res) => {
  try {
    const { uid: user_id } = req.user;
    const { text, parent_id, article_id } = req.body;

    const comment = await CommentService.postComment(text, parent_id, user_id, article_id);

    console.log(comment.length);
    if(!comment.length) {
      return res.status(400).send({ success: false })
    }
    res.status(200).send({ success: true, comment: comment[0] });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { uid: user_id } = req.user;
    const { article_id, parent_id } = req.query;

    const comments = await CommentService.getComments(article_id, parent_id)

    res.status(200).send({ response: comments});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  postComment,
  getComments,
};
