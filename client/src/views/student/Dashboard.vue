<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet
          elevation="1"
          color="surface"
          width="100%"
          class="pa-2"
          rounded
        >
          <div class="d-flex justify-center">{{ store.getters.user?.name || 'Bosh Sahifa' }}</div>
        </v-sheet>
      </v-col>
    </v-row>

    
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/books.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/resources" block variant="flat" color="primary">Fanlar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/administration.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/schedule" block variant="flat" color="primary">Dars Jadvali</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/exam.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/exams" block variant="flat" color="primary">Imtihonlar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/test.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/rates/exam" block variant="flat" color="primary">Test Natijalari</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "../../axios";
import { useStore } from 'vuex'

const store = useStore()
const info = ref({
  students: 0,
  groups: 0,
  tests: 0,
  inspectors: 0,
});

const carts = [
  { title: 'Guruhlar', color: 'green accent-3', item: 'groups', icon: 'mdi-account-box-multiple' },
  { title: 'Talabalar', color: 'red accent-3', item: 'students', icon: 'mdi-account-group' },
  { title: 'Nazoratchilar', color: 'blue accent-3', item: 'inspectors', icon: 'mdi-police-badge' },
  { title: 'Testlar', color: 'amber darken-3', item: 'tests', icon: 'mdi-clipboard-text-multiple' },
];

async function init() {
  const { data } = await axios.get("/info");
  Object.assign(info.value, data)
}

// init()
</script>