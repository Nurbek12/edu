<template>
  <v-app-bar density="compact" height="80" color="background" flat>
    <v-app-bar-title title="Payariq Med Texnikum">PJST O'quv Platformasi</v-app-bar-title>

    <template v-slot:append>
      <v-btn variant="elevated" class="mr-1" size="40" color="primary" @click="changeTheme">
        <v-icon>{{themeIcon}}</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import vuetify from "../plugins/vuetify"
import { computed } from "vue"

const signout = () => {
  location.href = '/login'
}

const changeTheme = () => {
  vuetify.theme.global.name.value =
  vuetify.theme.global.name.value === "dark" ? "light" : "dark";
  localStorage.setItem('theme', vuetify.theme.name.value)
}

const themeIcon = computed(() => {
  return vuetify.theme.global.name.value === "dark" ? "mdi-weather-night" : "mdi-white-balance-sunny";
})
</script>

<style>
</style>