<template>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="title"
              :rules="nameRules"
              :counter="10"
              label="Title"
              required
              hide-details
              prepend-icon="$vuetify"
            ></v-text-field>
          </v-col>
        </v-row>
  
        <v-row>
          <v-col cols="12">
            <v-textarea
              variant="filled"
              required
              auto-grow
              label="Description"
              rows="2"
              row-height="20"
              prepend-icon="$vuetify"
            ></v-textarea>
          </v-col>
        </v-row>
  
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="value"
              :items="items"
              chips
              required
              label="Select Tags"
              multiple
              prepend-icon="$vuetify"
            ></v-select>
          </v-col>
  
          <v-col cols="6">
            <v-text-field
              v-model="mediaUrl"
              :rules="nameRules"
              :counter="10"
              label="Enter media url"
              required
              hide-details
              prepend-icon="$vuetify"
            ></v-text-field>
          </v-col>
        </v-row>
  
        <v-row justify="center">
          <v-col cols="4">
            <v-btn type="submit" block class="mt-2">Cancel</v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn type="submit" block class="mt-2">Submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </template>
  
  <script>
    export default {
      data: () => ({
        valid: false,
        title: '',
        content: '',
        mediaUrl: '',
        items: ['foo', 'bar', 'fizz', 'buzz'],
        value: [],
        nameRules: [
          value => {
            if (value) return true
  
            return 'Name is required.'
          },
          value => {
            if (value?.length <= 10) return true
  
            return 'Name must be less than 10 characters.'
          },
        ],
        email: '',
        emailRules: [
          value => {
            if (value) return true
  
            return 'E-mail is requred.'
          },
          value => {
            if (/.+@.+\..+/.test(value)) return true
  
            return 'E-mail must be valid.'
          },
        ],
      }),
    }
  </script>
  