<template>
  <v-card color="grey-lighten-4" height="90vh">
    <v-form v-model="form" @submit.prevent="onSubmitLogin">
      <v-card
        class="mx-auto my-10 pa-12 pb-8"
        color="grey-lishten-4"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          v-model="email"
          :rules="[rules.required]"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a
          >
        </div>

        <v-text-field
          v-model="password"
          :rules="[rules.required, rules.password]"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          block
          class="mb-4 mt-4"
          color="primary"
          size="large"
          variant="outlined"
          type="submit"
          :disabled="!this.form"
        >
        <v-progress-circular v-if="loading" class="mr-6" color="primary" size="20" indeterminate></v-progress-circular>
          <div v-if="!loading">Log In</div>
          <div v-else>Loading</div>
        </v-btn>

        <v-card class="mb-12" v-if="error" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          {{ error }}
        </v-card-text>
      </v-card>

        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </v-form>
  </v-card>
</template>

<script>
import UserApi from '@/services/userApi'

export default {
  data: () => ({
    loading: false,
    visible: false,
    form: false,
    email: null,
    password: null,
    error: null,
    rules: {
          required: value => !!value || 'This field is required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          password: value => value.length >= 4 || 'Password must be of atleast 8 characters'
        },
  }),
  methods: {
    async onSubmitLogin() {
      this.loading = true

      const result = await UserApi.signInUserWithUsername({email: this.email, password: this.password})
      console.log('login result: ', result);
      if (result.error) {
        this.error = result.error
        this.loading = false;
        return
      }

      this.$store.dispatch('user/login', {user: result.user, token: result.token, location: result.location})
      this.loading = false;
      this.$router.push('../')

      this.$toast.success('Logged In Successfylly', { position: 'bottom-right', duration: 3000})

    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    }
  },
  watch: {
    form(value) {
        console.log('form: ', value);
    }
  }
};
</script>
