<template>
  <v-container fluid class="bg-img py-0 h-100">
    <v-row class="h-100" justify="center" align="center">
      <v-card max-width="400px" width="100%" elevation="2" class="px-1 py-4">
        <v-card-text class="d-flex justify-center pb-0 pt-1">
          <v-avatar rounded size="200">
            <v-img src="/logo.png"></v-img>
          </v-avatar>
        </v-card-text>
        <!-- <v-card-title class="d-flex justify-center">Payariq Abu Ali Ibn Sino nomidagi jamoat salomatlik texnikumi</v-card-title> -->
        <v-card-text class="text-center text-body-1">Payariq Abu Ali Ibn Sino nomidagi jamoat salomatlik texnikumi</v-card-text>
        <v-card-text class="d-flex justify-center text-red-lighten-1 py-1" v-if="error">Login yoki parol xato!</v-card-text>
        <v-form ref="form">
          <v-card-text>
            <v-row>
              <v-col cols="12" class="py-2">
                <v-text-field
                  v-model="user.login"
                  label="Login"
                  hide-details color="primary"
                  :rules="rules"
                  variant="solo-filled"
                />
              </v-col>
              <v-col cols="12" class="py-2">
                <v-text-field
                  v-model="user.password"
                  label="Parol"
                  hide-details autocomplete="off"
                  :rules="rules" color="primary"
                  variant="solo-filled"
                  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append-inner="show = !show"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="px-4 py-1">
            <v-btn color="primary" height="48" variant="elevated" block @click="validate">Tizimga kirish</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios, { checkToken } from "../axios";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'

const store = useStore();
const router = useRouter()
const show = ref(false);
const rules = [(v) => !!v || "Required"];
const form = ref(null);
const error = ref(false);

const user = ref({
  login: "",
  password: "",
});
const login = async () => {
  const { data } = await axios.post("/auth/login", {
    login: user.value.login,
    password: user.value.password,
  });
  if (data.success) {
    store.commit("setUser", data.user);
    store.commit("setToken", data.token);
    checkToken()
    router.push("/" + data.user.role)
  }else{
    Object.assign(user.value, {
      login: "",
      password: "",
    })
    error.value = true
  }
};
const validate = async () => {
  const { valid } = await form.value.validate();
  if (valid) login();
};
</script>