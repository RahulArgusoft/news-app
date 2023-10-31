<template>
  <div>
    <div v-if="newsList.length">
      <news-card
        v-for="news in newsList"
        :key="news.article_id"
        :news="news"
      ></news-card>
    </div>

    <div
      v-if="loading && !newsList.length"
      class="d-flex justify-center align-center mt-6"
    >
      <v-progress-circular indeterminate :size="50"></v-progress-circular>
      <span class="text-grey text-h4 mx-2">Loading...</span>
    </div>

    <div
      v-if="!loading && !newsList.length"
      class="d-flex justify-center align-denter mt-10"
    >
      <span class="text-grey">No News Fetched!!</span>
    </div>

    <div
      v-if="loading && newsList.length"
      class="d-flex justify-center align-center mt-6"
    >
      <v-progress-circular indeterminate :size="50"></v-progress-circular>
      <span class="text-grey mx-2">Loading more news...</span>
    </div>

    <!-- at the end of the page -->
    <div v-if="end" class="d-flex flex-column align-center justify-center">
      <!-- <v-rating model-value="5" class="ma-2" density="comfortable"></v-rating> -->
      <v-rating
        readonly
        :length="8"
        :size="100"
        :model-value="8"
        active-color="teal"
      />
      <span class="text-grey text-h5 mx-2 mb-2">NO MORE NEWS TO SHOW</span>
    </div>

    <!-- <v-progress-circular indeterminate :size="128" align-center></v-progress-circular> -->
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
      end: false,
    };
  },
  methods: {
    async getAllNews() {
      try {
        this.loading = true;
        const news = await GlobalNewsService.fetchGlobalNews(this.page);

        if (this.newsList.length && !news.length) {
          this.end = true;
        }

        this.newsList.push(...news);
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },

    infiniteScroll() {
      if(this.end) {
        return
      }
      
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
