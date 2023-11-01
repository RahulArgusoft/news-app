<template>
  <v-app-bar class="header" color="grey-lighten-2">
    <v-app-bar-nav-icon
      icon="mdi-newspaper-variant-outline"
    ></v-app-bar-nav-icon>

    <v-app-bar-title>News Application</v-app-bar-title>

    <v-btn v-if="!isLoggedIn" variant="outlined" to="/sign-in"> Login </v-btn>
    <div v-else class="text-center mr-4">
      <v-menu v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn color="black" icon="mdi-account" v-bind="props"></v-btn>
        </template>

        <v-card min-width="250" rounded>
          <v-list>
            <v-list-item
              to="/user"
              :title="userData?.name"
              :subtitle="userData?.email"
              @click="menu = false"
            >
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item @click="menu=false" link>
              <v-icon icon="mdi-account-edit" ></v-icon>
              <span class="mx-4" color="grey-lighten-2">Edit Profile</span>
            </v-list-item>

            <v-list-item @click="menu=false" to="/local/uploads">
              <v-icon icon="mdi-newspaper"></v-icon>
              <span class="mx-4" color="grey-lighten-2">Your Uploads</span>
            </v-list-item>
            <!-- <v-list-item color="black" prepend-icon="mdi-account-edit" title="Edit Profile" link></v-list-item> -->
            <!-- <v-list-item prepend-icon="mdi-newspaper" title="Your Uploads" link></v-list-item> -->
          </v-list>
          <v-divider></v-divider>

          <!-- <v-card-actions> -->
            <v-spacer></v-spacer>

            <v-btn variant="plain" prepend-icon="mdi-logout" @click="logoutUser" >
              {{ loading ? 'Loading..' : 'Log out' }}
            </v-btn>
            <v-progress-circular v-if="loading" color="black mr-1" :width="1" size="15" indeterminate></v-progress-circular>
          <!-- </v-card-actions> -->
        </v-card>
      </v-menu>
    </div>
    <!-- <v-btn v-else variant="outlined" @click="logoutUser" >
        <v-progress-circular v-if="loading" color="black mr-1" :width="1" size="15" indeterminate></v-progress-circular>
        {{ loading ? 'Loading...' : 'Log out' }}
      </v-btn> -->
  </v-app-bar>
</template>

<style>
.profile {
  position: fixed;
  z-index: 5;
}

.header {
  background-color: rgba(0, 0, 0, 0.12) !important;
  backdrop-filter: blur(5px) !important;
}
</style>

<script>
import UserApi from "@/services/userApi";

export default {
  data() {
    return {
      loading: false,
      menu: false,
    };
  },
  methods: {
    async logoutUser() {
      try {
        this.loading = true;
        const response = await UserApi.logoutUser();
        if (response.error) {
          console.log(">TheHeader: ", response);
          return;
        }
        this.$store.dispatch("user/logout");

        this.$router.push('../')
      } catch (error) {
      } finally {
        this.loading = false;
        this.menu = false
        this.$toast.success('Logged Out Successfully', { duration: 3000 })
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
    userData() {
      return this.$store.getters['user/user'];
    }
  },
};
</script>
