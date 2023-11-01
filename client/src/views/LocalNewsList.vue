<template>
  <div>
    <div v-if="newsList.length">
      <news-card v-for="news in newsList" :key="news.article_id" :news="news">
        <template v-slot:comment>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn :to="'local/' + news.article_id"> Read more </v-btn>
            <v-btn @click="comment = !comment">
              <v-icon icon="mdi-comment-processing" size="x-large"></v-icon>
            </v-btn>
          </v-card-actions>
        </template>

        <template v-slot:location>
          <span class="me-1"><v-icon icon='mdi-map-marker'></v-icon> {{location.city}}, {{location.country}}</span>
        </template>
      </news-card>
    </div>

    <!-- <div v-if="comment">
    <the-comment ></the-comment>
    </div> -->

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
      <v-rating
        readonly
        :length="8"
        :size="100"
        :model-value="8"
        active-color="teal"
      />
      <span class="text-grey text-h5 mx-2 mb-2">NO MORE NEWS TO SHOW</span>
    </div>

    <div class="fixed-bottom-right">
      <v-btn
        class="fixed-botton-right"
        color="black"
        icon="mdi-plus"
        elevation="20"
        @click="isNewNews = true"
      ></v-btn>
    </div>

    <local-news-form
      v-if="isNewNews"
      v-on:closeNewNewsDialog="closeNewNewsDialog"
    ></local-news-form>
  </div>
</template>

<script>
import LocalNewsService from "@/services/LocalNewsService";
import NewsCard from "@/components/NewsCard.vue";
import LocalNewsForm from "../components/dialogs/LocalNewsForm.vue";
import TheComment from "../components/dialogs/TheComment.vue";

export default {
  components: {
    NewsCard,
    LocalNewsForm,
    TheComment,
  },
  data() {
    return {
      // comment: false,
      isNewNews: false,
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
        const news = await LocalNewsService.fetchLocalNews(this.page);

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
      if (this.end) {
        return;
      }

      if (
        window.scrollY + window.innerHeight + 1 >=
        document.documentElement.scrollHeight
      ) {
        this.page = this.page + 1;
        this.getAllNews(this.page);
      }
    },

    closeNewNewsDialog() {
      this.isNewNews = false;
    },
  },
  async created() {
    // Fetch news when the component is created
    await this.getAllNews();
    this.$store.dispatch("categories/fetchLocalTags");
  },

  computed: {
    location() {
      let data = JSON.parse(this.$store.getters['user/location'])
      return data;
    }
  },

  mounted() {
    window.addEventListener("scroll", this.infiniteScroll);
  },

  unmounted() {
    window.removeEventListener("scroll", this.infiniteScroll);
  },
};
</script>

<style>
.fixed-bottom-right {
  position: fixed;
  bottom: 30px; /* Adjust this value to control the distance from the bottom */
  right: 20px; /* Adjust this value to control the distance from the right */
}

.blur-bg {
  background: transparent;
  backdrop-filter: blur(50px);
}
</style>
