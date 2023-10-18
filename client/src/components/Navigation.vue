<template>
  <v-navigation-drawer expand-on-hover rail permanent color="grey-lighten-2">
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Sandra Adams"
        subtitle="sandra_a88@gmailcom"
        size="large"
      ></v-list-item>
    </v-list>

    <v-divider class="mx-3"></v-divider>

    <v-list density="compact" nav>
      <NavCategory></NavCategory>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import NavCategory from './NavCategory.vue';

export default {
    components: {
        NavCategory
    }
}
</script>