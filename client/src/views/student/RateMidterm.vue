<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2" rounded>
          <div class="d-flex justify-center">ORALIQ NATIJALARI</div>
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
            <v-data-table items-per-page-text :headers="headers" :search="search" :items="items">
              <template #item.test="{ index, item }">
                <td data-label="Fan nomi">{{ index + 1 }}. {{ item.raw.midterm?.name }}</td>
              </template>
              <template #item.student="{ item }">
                <td data-label="Talaba">{{ item.raw.student?.name }}</td>
              </template>
              <template #item.start="{ item }">
                <td data-label="Boshlangan vaqti">{{ new Date(item.raw.start_time).toLocaleString() }}</td>
              </template>
              <template #item.end="{ item }">
                <td data-label="Tugatilgan vaqti">{{ new Date(item.raw.end_time).toLocaleString() }}</td>
              </template>
              <template #item.rate="{ item }">
                <td data-label="To'g'ri javoblar">{{ item.raw.rate }}/{{ item.raw.questions }}</td>
              </template>
              <template #item.percent="{ item }">
                <td data-label="Foiz">{{ parseFloat((item.raw.rate * 100) / item.raw.questions).toFixed(1) }} %</td>
              </template>
              <template #item.view="{ item }">
                <td data-label="Ko'rish">
                  <v-btn size="30" color="primary" variant="flat" :to="`/midterms/${item.raw._id}`">
                    <v-icon>mdi-eye-arrow-right</v-icon>
                  </v-btn>
                </td>
              </template>
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
  { title: "Fan Nomi", key: "test" },
  { title: "Talaba", key: "student", sortable: false },
  { title: "Boshlangan vaqti", key: "start", sortable: false },
  { title: "Tugatilgan vaqti", key: "end", sortable: false },
  { title: "To'g'ri javoblar", key: "rate", sortable: false },
  { title: "Foiz", key: "percent" },
  { title: "Ko'rish", key: "view", sortable: false }
];

const search = ref("");
const items = ref([]);
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedId = ref(-1);

const initialize = async (distance) => {
  const { data } = await axios.get(`/midterm/result?user=${store.getters.userid}&${distance}`);
  items.value = data;
};

initialize('');
</script>