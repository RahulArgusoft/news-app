import api from "./axios";

export default {
  async fetchGlobalNews(page) {
    try {
      const { data } = await api.get(`/global-news?page=${page}`);
      console.log(page);
      return data.response;
    } catch (error) {
      console.error("Failed to fetch global news:", error);
      throw error;
    }
  },

  async fetchGlobalNewsByCategory(category, page=1) {
    console.log('called');
    try {
      const { data } = await api.get(`/global-news/${category}?page=${page}`);
      console.log(page);
      return data.response;
    } catch (error) {
      console.error("Failed to fetch global news:", error);
      throw error;
    }
  }
};
