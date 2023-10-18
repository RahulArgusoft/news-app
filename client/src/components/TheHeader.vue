<template>
  <v-app-bar class="header" color="grey-lighten-2">
    <v-app-bar-nav-icon icon="mdi-newspaper-variant-outline"></v-app-bar-nav-icon>

    <v-app-bar-title>News Application</v-app-bar-title>

    <v-btn variant="outlined" to="/sign-in"> Login </v-btn>
  </v-app-bar>
</template>

<style>
.profile {
  position: fixed;
  z-index: 5;
}

.v-list-item--active {
  /* this is the class of the active element */
}

.header {
  background-color: rgba(0, 0, 0, 0.12) !important;
  backdrop-filter: blur(5px) !important;
}
</style>

<script>
export default {};
</script>
