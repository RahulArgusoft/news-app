<template>
  <v-list-item
    v-for="category in categories"
    :key="category.tag"
    :prepend-avatar="category.url"
    :title="category.label"
    :value="category.tag"
    :to="category.tag"
  >
  </v-list-item>
</template>

<script>
import CategoryService from "@/services/CategoryService";

export default {
  props: ["category"],
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    toggleCategory(categoryTag) {
      const currentRoute = this.$router.currentRoute.value;
      const currentParams = { ...currentRoute.params };

      if (currentParams.category === categoryTag) {
        this.$router.push({ name: 'all-news', params: currentParams });
      } else {
        currentParams.category = categoryTag;
        this.$router.push({ name: 'category-news', params: currentParams });
      }
    },
  },
  async created() {
    // Fetch categories when the component is created
    try {
      this.categories = await CategoryService.fetchCategories();
      this.categories.unshift({tag: '/', label: 'All News', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqnla2rdC9tjA_fHWxx3oG7oLoIHlHjSlSnQ&usqp=CAU'})
    } catch (error) {
      console.log(error.message);
    }
  },
};
</script>

<style>
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}
</style>
