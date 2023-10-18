import api from "./axios";

export default {
  async fetchCategories() {
    try {
      const { data } = await api.get(`/category`);
      return data.categories;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  },
};
