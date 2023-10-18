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
  data() {
    return {
      newsList: [],
      loading: false,
      selection: 1,
      page: 1,
    };
  },
  methods: {
    async getAllNews() {
      try {
        const news = await GlobalNewsService.fetchGlobalNews(this.page);
        this.newsList.push(...news);
        console.log(this.newsList);
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
        this.getAllNews(this.page);
      }
    },
  },
  created() {
    // Fetch news when the component is created
    this.getAllNews();
  },

  mounted() {
    window.addEventListener("scroll", this.infiniteScroll);
  },

  unmounted() {
    window.removeEventListener("scroll", this.infiniteScroll);
  },
};
</script>
