<template>
  <div>
    <!-- <v-row class="align-center"> -->
      <!-- <v-col cols="12" sm="12"> -->
        <v-textarea
          rows="3"
          active
          :label="userFullName || username"
          :error-messages="v$.$errors.map((e) => e.$message)"
          v-model="commentText"
          prepend-icon="mdi-account"
          append-innerIcon="mdi-send"
          placeholder="Write Comment"
          variant="solo-filled"
          @input="v$.commentText.$touch"
          @click:appendInner="postComment"
          persistent-counter
          counter="500"
          auto-grow
        >
          <template v-slot:counter="{ counter }">
            <span :class="{ 'text-red font-weight-bold': v$.commentText.$error }">
              {{ counter }}</span
            >
          </template>
        </v-textarea>
      <!-- </v-col> -->
      <!-- <v-col cols="12" sm="1">
        <v-btn @click="postComment" variant="plain">send</v-btn>
      </v-col> -->
    <!-- </v-row> -->
  </div>
</template>

<script>
import CommentsService from "@/services/CommentsService";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
  props: ["article_id", "parent_id"],
  // setup() {
  //   return { v$: useVuelidate() }
  // },
  data() {
    return {
      commentText: "",
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      commentText: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(500),
      },
    };
  },
  methods: {
    async postComment() {
      try {
        this.v$.$touch();
        if (this.v$.commentText.$invalid) {
          return;
        }

        console.log(this.parent_id, this.article_id);
        let response = await CommentsService.postComment(
          this.commentText,
          this.article_id,
          this.parent_id
        );

        console.log("response: ", response);
        if (response.success) {
          this.$emit("commentPosted", response.comment);

          this.commentText = "";
          this.v$.$reset();
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed: {
    userFullName() {
      let name = this.$store.getters["user/user"].name;
      return name.toUpperCase();
    },
    username() {
      console.log(this.$store.getters["user/user"].username);
      return this.$store.getters["user/user"].username;
    },
  },
};
</script>
