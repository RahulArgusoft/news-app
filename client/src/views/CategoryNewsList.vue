<template #news-list>
  <div v-for="news in newsList" :key="news.article_id">
    <news-card :news="news"></news-card>
  </div>
</template>

<script>
import GlobalNewsService from "@/services/GlobalNewsService";
import NewsCard from "@/components/NewsCard.vue";

export default {
  components: {
    NewsCard,
  },
  props: ["category"],
  data() {
    return {
      newsList: [],
      loading: false,
      selection: 1,
      page: 1,
    };
  },
  methods: {
    async getCategoryNews() {
      try {
        const news = await GlobalNewsService.fetchGlobalNewsByCategory(
          this.category,
          this.page
        );
        this.newsList.push(...news);
      } catch (error) {
        console.log(error.message);
      }
    },

    infiniteScroll() {
      if (
        window.scrollY + window.innerHeight + 1 >=
        document.documentElement.scrollHeight
      ) {
        this.page = this.page + 1;
        this.getCategoryNews(this.category, this.page);
      }
    },
  },
  created() {
    // Fetch news when the component is created
    this.getCategoryNews();
  },
  mounted() {
    window.addEventListener("scroll", this.infiniteScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.infiniteScroll);
  },
  watch: {
    category(value) {
      console.log(value);
      this.newsList = [];
      this.page = 1;
      this.getCategoryNews(this.category, this.page);
    },
  },
};
</script>
