<template>
  
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="512"
    elevation="5"
  >

  <the-comment v-if="comment"></the-comment>
  
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img cover height="260" :src="news.image_url">
      <v-btn
        variant="text"
        height="260"
        width="512"
        :href="news.image_url"
        target="_blank"
      ></v-btn>
    </v-img>

    <v-card-item>
      <p class="text-h6">{{ news.title }}</p>

      <v-card-subtitle class="mt-3">
        <span class="mt-1"
          ><b class="text-black">Posted on</b> {{ news.created_at }}</span
        >
      </v-card-subtitle>
      <v-card-subtitle class="mt-1">
        <span class=""
          ><b class="text-black">Short by</b> {{ news.author_name }}</span
        >
      </v-card-subtitle>
      <v-card-subtitle class="mt-1">
        <slot name="location"></slot>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <div class="mb-4">
          <v-chip-group v-model="selection">
            <v-chip size="small" v-for="tag in news.tags" :key="tag?.tag_id || tag" :to="tag.tag_id">{{
              tag?.tag_name || tag
            }}</v-chip>
          </v-chip-group>
        </div>
      </v-row>

      <v-divider class="mx-1 mb-4"></v-divider>

      <div>
        {{ news.content }}
      </div>
    </v-card-text>

    <v-card-actions v-if="news.source_name">
      Read more at
      <v-btn
        color="purple"
        size="small"
        variant="text"
        :href="news.source_url"
        target="_blank"
      >
        {{ news.source_name }}
      </v-btn>
    </v-card-actions>
    
    <slot name="comment"></slot>

  </v-card>
</template>

<script>
import TheComment from './dialogs/TheComment.vue';

export default {
  components: {
    TheComment
  },
  props: ["news",],
  data() {
    return {
      comment: false,
      loading: null,
      selection: null,
    };
  },
  created() {
    // console.log(this.news);
  },
};
</script>

<style>
.text-h6 {
  line-height: 1.5rem !important;
  font-weight: 400 !important;
}

.v-btn__content {
  letter-spacing: 0.04em;
}
</style>
