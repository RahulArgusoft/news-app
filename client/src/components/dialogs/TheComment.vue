<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="800">
      <!-- <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Open Dialog
        </v-btn>
      </template> -->

      <v-card>
        <v-card-title>
          <span class="text-h5">Comment</span>
        </v-card-title>
        <!-- <v-card-text> Lorem ipsum dolor sit amet. </v-card-text> -->
        <the-comment></the-comment>


        
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import CommentField from "../comments/CommentField.vue";
export default {
  component: {
    CommentField,
  },
  data() {
    return {
      dialog: true,
    };
  },
};
</script>
