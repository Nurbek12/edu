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
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="({ title, color, item, icon }, i) in carts"
        :key="i"
      >
        <v-card class="mx-auto" style="overflow: unset;">
          <v-sheet style="position: absolute; top: -10px; left: 10px"
            :color="color"
            height="75"
            width="75"
            rounded
            elevation="3"
            class="d-flex align-center justify-center"
          >
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
      <v-col cols="12">
        <v-card class="pt-4">
          <!-- <v-card-title>Kunlik hisobotlar jadvali</v-card-title> -->
          <v-card-title>
            <v-sheet max-width="300">
              <v-text-field density="compact" @change="getActions($event.target.value)" label="Kunlik hisobotlar jadvali" hide-details flat variant="outlined" type="date"></v-text-field>
            </v-sheet>
          </v-card-title>
          <v-card-text>
            <v-data-table no-data-text="Hech narsa topilmadi" items-per-page-text
              :items="items" :headers="headers" density="comfortable">
              <template #item.title="{ index, item }">
                <td data-label="Sarlavha">{{index+1}}. {{ item.raw.title }}</td>
              </template>
              <template #item.date="{ item }">
                <td data-label="Sana/vaqti">{{ new Date(item.raw.createdAt).toLocaleString() }}</td>
              </template>
            </v-data-table>
          </v-card-text>
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
const items = ref([])
const headers = [
  { title: "Sarlavha", key: "title", sortable: false },
  { title: "Sana/vaqti", key: "date", sortable: false },
]
const info = ref({
  students: 0,
  groups: 0,
  tests: 0,
  inspectors: 0,
});

const carts = [
  { title: 'Guruhlar', color: 'green accent-3', item: 'groups', icon: 'mdi-account-box-multiple' },
  { title: 'Talabalar', color: 'red accent-3', item: 'students', icon: 'mdi-account-school' },
  { title: "O'qituvchilar", color: 'blue accent-3', item: 'teachers', icon: 'mdi-account-tie-woman' },
  { title: 'Testlar', color: 'amber darken-3', item: 'tests', icon: 'mdi-clipboard-text-multiple' },
];

async function init() {
  const { data } = await axios.get("/info");
  Object.assign(info.value, data)
}

async function getActions(dt) {
  const { data } = await axios.get(`/action?${dt?`date=${dt}`:``}`);
  items.value = data
}

init()
getActions()
</script>