<template>
  <v-layout>
    <TheHeader />
    <Navigation />
    <v-main style="height: 100vh">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import Navigation from "./components/Navigation.vue";

export default {
  components: {
    TheHeader,
    Navigation,
  },
};
</script>
