<template>
  <v-container v-if="!!newsData">
    <news-card :news="newsData"></news-card>

    <div>
      <v-container>
        <comment-field
          :article_id="article_id"
          @commentPosted="addComment"
        ></comment-field>
      </v-container>

      <span class="text-h5">
        Comments <v-icon icon="mdi-chat" size="small"></v-icon
      ></span>

      <v-divider :thickness="2" class="mx-0"></v-divider>

      <the-reply
        v-for="reply in replies"
        :key="reply.id"
        :reply="reply"
      ></the-reply>
    </div>
  </v-container>

  <v-container v-else>
    <div class="d-flex justify-center mt-10">
      <v-progress-circular indeterminate :size="150"></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import NewsCard from "./NewsCard.vue";
import LocalNewsService from "@/services/LocalNewsService";
import CommentField from "./comments/CommentField.vue";
import TheReply from "./comments/TheReply";
import CommentService from "../services/CommentsService";

export default {
  props: ["article_id"],
  components: { NewsCard, CommentField, TheReply },
  data() {
    return {
      loadedNews: null,
      newsData: null,
      replies: [],
    };
  },
  methods: {
    async getNewsData() {
      this.newsData = await LocalNewsService.fetchNewsData(this.article_id);
    },

    async getReplies() {
      this.replies = await CommentService.getReplies(this.article_id, null);
      console.log("this.replies: ", this.replies);
    },

    addComment(comment) {
      this.replies.unshift({ ...comment, name: this.userFullName });
    },
  },
  computed: {
    userFullName() {
      return this.$store.getters["user/user"].name;
    },
  },
  async mounted() {
    await this.getNewsData();
    this.getReplies();
  },
};
</script>
