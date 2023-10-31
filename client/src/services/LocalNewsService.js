import api from "./axios";

export default {
  async fetchLocalNews(page) {
    try {
      const { data } = await api.get(`/local-news?page=${page}`);
      console.log(data);
      return data.response;
    } catch (error) {
      console.error("Failed to fetch local news:", error);
      throw error;
    }
  },

  async saveNews(news) {
    try {
      // let { title, content, image_url } = ...news
      const { data } = await api.post(`/local-news/add`, {
        ...news
      });

      console.log(data.response);
      // return data.response;
    } catch (error) {
      console.log("Failed to fetch global news:", error);
      throw error;
    }
  },

  async fetchNewsData(news_id) {
    try {
      const { data } = await api.get(`/local-news/${news_id}`)

      return data.response
    } catch (error) {
      throw error
    }
  }
};
