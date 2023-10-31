import api from "./axios";

export default {
  async postComment(text, article_id, parent_id) {
    try {
      const { data } = await api.post(`/comments/add`, {
        text,
        article_id,
        parent_id,
      });

      return data;
    } catch (error) {
      console.log("comment not posted: ", error.message);
      throw error;
    }
  },

  async getReplies(article_id, parent_id) {
    try {
        const { data } = await api.get(`comments/get`, {
          params: { article_id, parent_id }
        })

        console.log(data);
        return data.response;
    } catch (error) {
        console.log('comments not fetched: ', error.message);
        throw error
    }
  }
};
