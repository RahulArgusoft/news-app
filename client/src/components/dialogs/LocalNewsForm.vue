<template>
  <v-row justify="center" style="opacity: .6;">
    <v-dialog elevation-24 v-model="dialog" persistent width="1024" style="backdrop-filter: blur(1px);">

      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title>
            <span class="text-h5">New Post</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    prepend-inner-icon="mdi-account"
                    readonly
                    v-model="userFullName"
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    prepend-inner-icon="mdi-map-marker"
                    readonly
                    :value="userLocation.city + ', ' + userLocation.country"
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="12">
                  <v-text-field
                    prepend-inner-icon="mdi-pencil"
                    label="Title"
                    v-model="title"
                    variant="solo-filled"
                    hint="Enter title"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-textarea
                    prepend-inner-icon="mdi-pencil"
                    label="Description"
                    v-model="description"
                    variant="solo-filled"
                    rows="3"
                    hint="Enter description of news"
                    counter="10"
                    persistent-counter
                  ></v-textarea>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    chips
                    prepend-inner-icon="mdi-tag"
                    label="Select Tags"
                    v-model="tags"
                    :items="localTags"
                    item-title="tag_name"
                    item-value="tag_id"
                    multiple
                    variant="solo-filled"
                    hint="Select relevent tags"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    prepend-inner-icon="mdi-link-variant"
                    label="Media URL"
                    variant="solo-filled"
                    v-model="image_url"
                  ></v-text-field>
                </v-col>

              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="red-darken-1"
              varient="text"
              type="reset"
              class="mr-2"
              @click="dialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue-darken-1" variant="text" type="submit" class="ml-auto">
              <v-progress-circular v-if="loading" color="black mr-1" :width="1" size="15" indeterminate></v-progress-circular>
              {{ loading ? 'Posting...' : 'Post' }}
            </v-btn>

          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>

 
</template>

<script>
import LocalNewsService from '@/services/LocalNewsService'

export default {
  props: ["isNewNews"],
  data() {
    return {
      dialog: true,
      loading: false,
      form: "",
      title: "",
      description: "",
      userLocation: {},
      tags: [],
      image_url: "https://source.unsplash.com/random",
      image_url1:
        "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;

      console.log(this.tags);

      try {
        await LocalNewsService.saveNews({
          title: this.title,
          content: this.description,
          image_url: this.image_url,
          tags: this.tags
        });

        this.loading = false;
        this.dialog = false
      } catch(err) {
        console.log(err);
      } finally {
        this.dialog = false
      }
      
    },
  },
  async created() {
    this.userLocation = JSON.parse(localStorage.getItem('location'))
  },
  computed: {
    localTags() {
      console.log(this.$store.getters["categories/localTags"]);
      return this.$store.getters["categories/localTags"];
    },
    userName() {
      return this.$store.getters["user/user"].username;
    },
    userFullName() {
      return this.$store.getters["user/user"].name;
    }
  },
  watch: {
    dialog() {
      this.$emit("closeNewNewsDialog");
    },
  },
};
</script>
