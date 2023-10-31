<template>
  <v-layout>
    <TheHeader />
    <Navigation />
    <v-main style="height: 100vh">
      <router-view></router-view>
      <!-- <div class="d-flex justify-center align-center mt-6">
        <v-progress-circular  indeterminate :size="50" ></v-progress-circular>
        <span class="text-grey mx-2">Loading...</span>
      </div> -->
    </v-main>
  </v-layout>
</template>

<script>
import TheHeader from "./components/common/TheHeader.vue";
import Navigation from "./components/Navigation.vue";

export default {
  components: {
    TheHeader,
    Navigation,
  },
};
</script>
