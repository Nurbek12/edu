<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2" rounded>
          <div class="d-flex justify-center">Davomat</div>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2" rounded>
          <div class="responsive-datatable">
            <v-data-table no-data-text="Hech narsa topilmadi" items-per-page-text :headers="headers" :search="search" :items="items">
              <template #item.subject="{ index, item }">
                <td data-label="Fan">{{ index + 1 }}. {{ item.raw.subject }}</td>
              </template>
              <template #item.teacher="{ item }">
                <td data-label="Talaba">{{ item.raw.teacher?.name }}</td>
              </template>
              <template #item.group="{ item }">
                <td data-label="Guruh">{{ item.raw.group?.name }}</td>
              </template>
              <template #item.date="{ item }">
                <td data-label="Vaqti">{{ item.raw.date }}</td>
              </template>
              <template #item.status="{ item }">
                <td data-label="Holati">
                  <v-chip :color="item.raw.status ? 'blue' : 'red'" label variant="elevated">
                    {{ item.raw.status ? "Sababli" : "Sababsiz" }}
                  </v-chip>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <FooterPage @getDate="init" />
</template>

<script setup>
import { ref } from "vue";
import axios from "../../axios";
import { useStore } from 'vuex'
import FooterPage from '../../components/FooterPage.vue'

const store = useStore()
const search = ref('')
const items = ref([]);
const headers = [
  { title: "Fan nomi", sortable: false, key: "subject", sortable: false },
  { title: "O'qituvchi", sortable: false, key: "teacher", sortable: false },
  { title: "Guruh", sortable: false, key: "group", sortable: false },
  { title: "Vaqti", sortable: false, key: "date" },
  { title: "Holati", sortable: false, key: "status", sortable: false },
];

const init = async (distance) => {
  const { data } = await axios.get(`/attendence?student=${store.getters.userid}&${distance||''}`);
  items.value = data;
};

init();
</script>