<template>
  <div>
    <v-list :items="items" item-title="title" item-value="id" lines="three">
      <template v-slot:subtitle="{ item }">
        <div v-html="item.content"></div>
      </template>
      <template v-slot:prepend="{ item }">
        <v-img
          :src="item.image_url"
          width="250"
          height="150"
          cover
          class="d-none d-md-inline-block mr-2"
        />
      </template>
      <template v-slot:append>
        <v-btn
          variant="solo-filled"
          icon="mdi-square-edit-outline"
          color="primary"
        ></v-btn>
        <v-btn
          variant="solo-filled"
          icon="mdi-delete"
          color="red-darken-4"
        ></v-btn>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["A", "B"],
    };
  },
};
</script>
