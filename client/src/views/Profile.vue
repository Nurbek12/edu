<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="px-1 pt-1">
        <v-sheet elevation="1" color="surface" width="100%" class="py-2" rounded>
          <div class="d-flex justify-center">Shaxsiy Ma'lumotlar</div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="px-1">
      <v-card max-width="450px" width="100%" color="surface">
        <v-form ref="form">
          <v-card-text class="mt-2">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :disabled="user.role === 'student'"
                  v-model="user.name"
                  label="Ism Familiya"
                  color="primary"
                  hide-details
                  :rules="rules"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :disabled="user.role === 'student'"
                  v-model="user.birthdate"
                  label="Tug'ilgan sanasi"
                  color="primary"
                  :rules="rules"
                  hide-details
                  type="date"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :disabled="user.role === 'student'"
                  v-model="user.login"
                  label="Login"
                  color="primary"
                  hide-details
                  :rules="rules"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.password"
                  label="Parol"
                  color="primary"
                  hide-details autocomplete="off"
                  variant="outlined"
                  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append-inner="show = !show"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.phone"
                  label="Telefon raqami"
                  color="primary"
                  hide-details
                  :rules="rules"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-btn color="primary" height="45" variant="flat" block @click="validate">Saqlash</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "../axios";
import { useStore } from "vuex";

const store = useStore();
const user = ref({});
const show = ref(false);
const rules = [(v) => !!v || "Required"];
const form = ref(null);

Object.assign(user.value, store.getters.user);
const save = async () => {
    const { _id, ...other } = user.value;
    const { data } = await axios.put(`/user/${_id}`, other);
    if (data) {
      store.commit("setUser", data);
    } else {
      user.value.login = "";
    }
  },
  validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save();
  };
</script>