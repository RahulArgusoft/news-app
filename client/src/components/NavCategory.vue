<template>
  <div>
    
    <v-list-item
      v-if="isLoggedIn"
      prepend-avatar="https://as2.ftcdn.net/v2/jpg/01/75/80/15/1000_F_175801521_yoYpgKz6wEkTBw5ZotVvi2PJrlk8V3LJ.jpg"
      title="Local News"
      value="local-News"
      to="/local"
    ></v-list-item>

    <div v-if="loading" class="d-flex justify-center mt-6">
      <v-progress-circular indeterminate :size="30"></v-progress-circular>
    </div>

    <v-list-item
      v-for="category in categories"
      :key="category.tag"
      :prepend-avatar="category.url"
      :title="category.label"
      :value="category.tag"
      :to="category.tag"
    >
    </v-list-item>
  </div>
</template>

<script>

export default {
  props: ["category"],
  data() {
    return {
      categories: [],
      loading: false,
    };
  },
  methods: {
    toggleCategory(categoryTag) {
      const currentRoute = this.$router.currentRoute.value;
      const currentParams = { ...currentRoute.params };

      if (currentParams.category === categoryTag) {
        this.$router.push({ name: "all-news", params: currentParams });
      } else {
        currentParams.category = categoryTag;
        this.$router.push({ name: "category-news", params: currentParams });
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn'];
    },
  },
  async created() {
    // Fetch categories when the component is created
    try {
      this.loading = true;
      await this.$store.dispatch('categories/fetchCategories')
      this.categories = await this.$store.getters['categories/categories']

      this.categories.unshift({
        tag: "/",
        label: "All News",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqnla2rdC9tjA_fHWxx3oG7oLoIHlHjSlSnQ&usqp=CAU",
      });
    } catch (error) {
      console.log(">NavCategory: ", error.message);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}
</style>
