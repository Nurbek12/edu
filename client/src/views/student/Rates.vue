<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2" rounded>
          <div class="d-flex justify-center">BAHOLAR JADVALI</div>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-sheet
          elevation="1"
          color="surface"
          width="100%"
          class="pa-2"
          rounded
        >
          <div class="responsive-datatable">
            <v-data-table items-per-page-text items-per-page="-1" :headers="headers" :search="search" 
              :items="subjects">
              <template #item.subject="{ index, item }">
                <td data-label="Fan nomi">
                  {{ index + 1 }}. {{ item.raw }}
                </td>
              </template>
              <template #item.totalRate="{ item }">
                <td data-label="Joriy">{{ parseFloat(items.jn[item.raw] || 0).toFixed(1) }} %</td>
              </template>
              <template #item.totalMidmRate="{ item }">
                <td data-label="Oraliq">{{ parseFloat(items.on[item.raw] || 0).toFixed(1)}} %</td>
              </template>
              <template #item.totalExamRate="{ item }">
                <td data-label="Yakuniy">{{ parseFloat(items.yn[item.raw] || 0).toFixed(1) }} %</td>
              </template>
              <template #item.total="{ item }">
                <td data-label="Umumiy">{{ parseFloat( ((items.yn[item.raw] || 0) + (items.on[item.raw] || 0) + (items.jn[item.raw] || 0)) / 3 ).toFixed(1) }} %</td>
              </template>
              <template #bottom></template>
              <template v-slot:no-data>
                <div>Hech narsa topilmadi</div>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <FooterPage @getDate="initialize" />
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import axios from "../../axios";
import { useStore } from 'vuex'
import FooterPage from '../../components/FooterPage.vue'

const store = useStore()
const headers = [
  //   { title: "Talaba", key: "student" },
  { title: "Fan Nomi", key: "subject" },
  { title: "Joriy", key: "totalRate" },
  { title: "Oraliq", key: "totalMidmRate" },
  { title: "Yakuniy", key: "totalExamRate" },
  { title: "Umumiy", key: "total" },
];

const search = ref("");
const items = ref({});
const subjects = ref([]);
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedId = ref(-1);

const initialize = async (distance) => {
  const { data } = await axios.get(`/rate/student/${store.getters.userid}?${distance}`);
  items.value = data;
  subjects.value = data.subjects
};

initialize('');
</script>