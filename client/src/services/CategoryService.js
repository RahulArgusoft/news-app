import api from "./axios";

export default {
  async fetchCategories() {
    try {
      const { data } = await api.get(`/category`);
      return data.categories;
    } catch (error) {
      console.log("Failed to fetch categories:", error);
      throw error;
    }
  },

  async fetchLocalTags() {
    try {
      const { data } = await api.get(`/local-tags`);

      return data.tags;
    } catch (error) {
      console.log('failed to fetch localTags: ', error);
      throw error;
    }
  }
};
