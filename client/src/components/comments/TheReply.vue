<template>
  <div>
    <v-container>
      <v-textarea
      active
      rows="1"
      readonly
      
      prepend-icon="mdi-account"
      append-inner-icon="mdi-reply"
      @click:appendInner="comment = !comment"
      no-resize
      auto-grow
      persistent-counter
      variant="solo-filled"
      :value="reply.text"
    > 
      <template #label>
        <span class="headline-text-darken-2">
          {{ reply.name }}
        </span>
      </template>
      <template #counter>
        <div>
          <v-btn
            size="small"
            varient="text"
            color="grey-lighten-4"
            elevation="0"
            v-if="+reply.total_replies"
          >
            <span v-if="showComments" @click="getReplies(); showComments=!showComments"><v-icon icon="mdi-eye"></v-icon> {{ reply.total_replies }} replies</span>
            <span v-else @click="showComments=!showComments" ><v-icon icon="mdi-eye-off"></v-icon> Hide replies</span>
          </v-btn>
        </div>
      </template>
    </v-textarea>
    </v-container>
    

    <div v-if="!showComments && replies.length">
      <the-reply v-for="reply1 in replies" :key="reply1.id" :reply='reply1'></the-reply>
    </div>

    <v-container v-if="comment">
      <comment-field
        :article_id="reply.article_id"
        :parent_id="reply.id"
        @commentPosted="addComment"
      ></comment-field>
    </v-container>
  </div>
</template>

<script>
import CommentField from "@/components/comments/CommentField.vue";
import CommentService from '@/services/CommentsService.js';

export default {
  components: { CommentField },
  props: ["reply"],
  data() {
    return {
      comment: false,
      showComments: true,
      article_id: this.$route.params["article_id"],
      replies: []
    };
  },
  methods: {
    addComment(comment) {
      this.replies.unshift({ ...comment, name: this.userFullName });
    },
    async getReplies() {
      if(!this.replies.length) {
        this.replies = await CommentService.getReplies(this.article_id, this.reply.id)
      }
      console.log('this.replies: ', this.replies);
    }
  },
  computed: {
    userFullName() {
      return this.$store.getters["user/user"].name;
    },
  },
  mounted() {},
  async created() {
    // this.replies = await CommentService.getReplies(this.article_id, reply.article_id)
  },
  watch: {
    comment(value) {
      console.log(value);
    }
  }
};
</script>
