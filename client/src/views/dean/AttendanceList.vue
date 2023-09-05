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
          <div class="d-flex justify-center">Davomat</div>
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
                v-model="attendanceGroup"
                label="Guruh"
                @update:modelValue="getUsers('')"
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
                :items="items"
                color="primary"
                item-title="name"
                return-object
                variant="outlined"
              >
              </v-select>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-select
                v-model="search"
                label="Fan"
                density="comfortable"
                hide-details
                clearable
                :items="subjects"
                color="primary"
                clear-icon="mdi-close"
                item-title="name"
                item-value="name"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-select
                label="Semestr"
                :disabled="!attendanceGroup"
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
          <div class="w-100 d-flex justify-center">NB-lar Ro'yxati</div>
          <div class="responsive-datatable mt-2">
            <v-data-table
              no-data-text="Hech narsa topilmadi"
              density="compact"
              items-per-page-text
              items-per-page="-1"
              :headers="headers"
              :search="search"
              :items="user?.attendences || []"
            >
              <template #item.teacher="{ item }">
                <td data-label="O'qituvchi">{{ item.raw.teacher }}</td>
              </template>
              <template #item.subject="{ item }">
                <td data-label="Fan">{{ item.raw.subject }}</td>
              </template>
              <template #item.date="{ item }">
                <td data-label="Vaqti">{{ item.raw.date }}</td>
              </template>
              <template #item.status="{ item }">
                <td data-label="Holati">
                  <v-chip
                    :color="item.raw.status ? 'blue' : 'red'"
                    label
                    variant="elevated"
                    >{{ item.raw.status ? "Sababli" : "Sababsiz" }}</v-chip
                  >
                </td>
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
import { ref } from "vue";
import axios from "../../axios";
import { semesterYearArray } from "../../plugins/semesters";

const search = ref(null);
const user = ref(null);
const attendanceGroup = ref(null);
const items = ref([]);
const groups = ref([]);
const subjects = ref([]);
const headers = [
  { title: "O'qituvchi", sortable: false, key: "teacher" },
  { title: "Fan nomi", sortable: false, key: "subject" },
  { title: "Vaqti", sortable: false, key: "date" },
  { title: "Holati", sortable: false, key: "status" },
];

const init = async () => {
  const result = await Promise.all([
    axios.get(`/group`),
    axios.get(`/subject`),
  ]);
  groups.value = result[0].data;
  subjects.value = result[1].data;
};

const getUsers = async (distance) => {
  if (!attendanceGroup.value) return;
  const { data } = await axios.get(`/attendence/user/${attendanceGroup.value}?${distance}`);
  items.value = data;
};

const getDateByYear = (date) => {
  delete date.title;
  getUsers(new URLSearchParams(date).toString());
  if(user.value?.attendences){
    user.value = items.value.find(({_id})=>_id===user.value._id)
  }
};

init();
</script>

<style>
.exp-px-0 .v-expansion-panel-text__wrapper {
  padding: 8px !important;
}
</style>