import CategoryService from "@/services/CategoryService";

export default {
  namespaced: true,
  state: {
    categories: [],
    localTags: [],
  },
  getters: {
    categories: (state) => state.categories,
    localTags: (state) => state.localTags,
  },
  mutations: {
    getCategories(state, categories) {
      state.categories = categories;
    },
    getLocalTags(state, localTags) {
      state.localTags = localTags
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const categories = await CategoryService.fetchCategories();
        commit("getCategories", categories);
      } catch (error) {
        console.log(">category store: ", error.message);
      }
    },
    
    async fetchLocalTags({ commit }) {
      try {
        const localTags = await CategoryService.fetchLocalTags();
        commit("getLocalTags", localTags)
      } catch (error) {
        console.log('>category store: ', error.message);
      }
    }
  }
};
