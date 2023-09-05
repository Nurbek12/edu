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
          <div class="d-flex justify-center">Baholar jadvali</div>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="4">
        <v-sheet
          elevation="1"
          color="surface"
          width="100%"
          class="pa-2"
          rounded
        >
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="group"
                label="Guruh"
                @update:modelValue="getUsers"
                hide-details
                density="comfortable"
                :items="groups"
                color="primary"
                item-title="name"
                item-value="_id"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-select
                v-model="user"
                label="O'quvchi"
                hide-details
                density="comfortable"
                @update:modelValue="getTable('')"
                :items="users"
                color="primary"
                item-title="name"
                item-value="_id"
                variant="outlined"
              >
              </v-select>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-select
                :disabled="!group"
                label="Semestr"
                @update:modelValue="getDateByYear"
                hide-details
                :items="semesterYearArray"
                density="compact"
                color="primary"
                item-title="title"
                return-object
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-btn
                block
                color="primary"
                :disabled="!group"
                variant="flat"
                height="42" @click="download"
                >Yuklab olish</v-btn
              >
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="8">
        <v-sheet
          elevation="1"
          color="surface"
          width="100%"
          class="pa-2"
          rounded
        >
          <div class="responsive-datatable mt-2">
            <v-data-table
              no-data-text="Hech narsa topilmadi"
              items-per-page-text
              items-per-page="-1"
              :headers="headers"
              :search="search"
              :items="subjects"
            >
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
              <template v-slot:no-data>
                <div>Hech narsa topilmadi</div>
              </template>
              <template #bottom></template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import axios from "../../axios";
import { useStore } from "vuex";
import { semesterYearArray } from "../../plugins/semesters";

const store = useStore();
const headers = [
  { title: "Fan Nomi", key: "subject" },
  { title: "Joriy", key: "totalRate" },
  { title: "Oraliq", key: "totalMidmRate" },
  { title: "Yakuniy", key: "totalExamRate" },
  { title: "Umumiy", key: "total" },
];

const search = ref("");
const items = ref({});
const subjects = ref([]);
const group = ref(null);
const groups = ref([]);

const user = ref(null);
const users = ref([]);

const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedId = ref(-1);

// const findRate = (arr, subj) => {
  // return arr.find()
// };



const initialize = async () => {
    const { data } = await axios.get(`/group`);
    //   const { data } = await axios.get(`/rate/student/${store.getters.userid}?${distance}`);
    groups.value = data;
  },
  getTable = async (distance) => {
    const { data } = await axios.get(`/rate/student/${user.value}?${distance}`);
    items.value = data;
    subjects.value = data.subjects
  },
  getUsers = async () => {
    if (!group.value) return;
    const { data } = await axios.get(`/user/student?group=${group.value}`);
    users.value = data;
  },
  getDateByYear = (date) => {
    delete date.title;
    getTable(new URLSearchParams(date).toString());
  },
  download = async () => {
    const gr = groups.value.find(g => g._id === group.value)?.name

    await axios({
      method: "get",
      url: `/rate/download/${group.value}`,
      responseType: "blob",
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${gr}-guruh_baholar_jadvali.xlsx`);
      document.body.appendChild(link);
      link.click();
    });
    // downloadexcel.value = false;
  };

initialize();
</script>