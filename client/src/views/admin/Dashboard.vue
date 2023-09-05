<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2" rounded>
          <div class="d-flex justify-center">{{ store.getters.user?.name || 'Bosh Sahifa' }}</div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="({ title, color, item, icon }, i) in carts" :key="i">
        <v-card class="mx-auto" style="overflow: unset;">
          <v-sheet style="position: absolute; top: -10px; left: 10px" :color="color" height="75" width="75" 
            rounded elevation="3" class="d-flex align-center justify-center">
            <v-icon size="x-large" color="white">
              {{ icon }}
            </v-icon>
          </v-sheet>
          <v-card-text style="text-align: right">
            <div>{{ title }}</div>
            <p class="text-h4 text--primary">
              {{ info[item] }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/round-table.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/admin/groups" block variant="elevated" color="primary">Guruh Yaratish</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/books.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/admin/subjects" block variant="elevated" color="primary">Fan Yaratish</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/graduated.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/admin/students" block variant="elevated" color="primary">Talaba Qo'shish</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/question.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/admin/tests" block variant="elevated" color="primary">Yangi Test Yaratish</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Data Table</v-card-title>
          <v-card-text>
            <v-data-table no-data-text="Hech narsa topilmadi">

            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
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

init()
</script>