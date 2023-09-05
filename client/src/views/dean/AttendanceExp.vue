<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet
          elevation="1"
          color="surface"
          width="100%"
          class="pa-2 py-4"
          rounded
        >
          <v-row justify="space-between" align="center">
            <v-col cols="12" class="py-1" sm="4">
              <v-text-field
                label="Qidirish"
                v-model="search"
                variant="outlined"
                color="primary"
                density="compact"
                hide-details
              />
            </v-col>
            <v-col cols="12" class="py-1" sm="4">
              <v-select
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
            <v-col cols="12" class="py-1" sm="4">
              <v-btn
                block
                color="primary"
                @click="dialog = true"
                variant="flat"
                height="42"
                >Fayl yaratish</v-btn
              >
            </v-col>
          </v-row>
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
            <v-data-table
              items-per-page-text
              :headers="headers"
              density="comfortable"
              :search="search"
              :items="items" no-data-text="Hech narsa topilmadi"
            >
              <template #item.student="{ index, item }">
                <td data-label="Talaba">{{ index + 1 }}. {{ item.raw.student?.name }}</td>
              </template>
              <template #item.group="{ item }">
                <td data-label="Guruh">{{ item.raw.group?.name }}</td>
              </template>
              <template #item.inspector="{ item }">
                <td data-label="Hodim">{{ item.raw.inspector?.name }}</td>
              </template>
              <template #item.start_date="{ item }">
                <td data-label="Boshlanish sanasi">{{ item.raw.start_date }}</td>
              </template>
              <template #item.end_date="{ item }">
                <td data-label="Tugash sanasi">{{ item.raw.end_date }}</td>
              </template>
              <template #item.description="{ item }">
                <td data-label="Izoh">{{ item.raw.description }}</td>
              </template>
              <template v-slot:item.file="{ item }">
                <td data-label="Fayl">
                  <v-spacer></v-spacer>
                  <div class="d-flex justify-end align-center gap-4">
                    <a :href="`/files/${item.raw.file}`" target="_blank" download>
                      <v-btn size="30" elevation="0" color="primary">
                        <v-icon size="small">mdi-tray-arrow-down</v-icon>
                      </v-btn>
                    </a>
                  </div>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="550px">
      <v-card>
        <v-card-title class="mt-2 ml-2 mb-0">
          <span class="text-h5">Fayl Kiritish</span>
        </v-card-title>

        <v-card-text class="px-2 pt-0">
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="editedItem.group"
                    label="Guruh"
                    @update:modelValue="getUsers"
                    hide-details
                    :rules="rules"
                    :items="groups"
                    color="primary"
                    item-title="name"
                    item-value="_id"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="editedItem.student"
                    label="Talaba"
                    hide-details
                    :items="users"
                    color="primary"
                    :rules="rules"
                    item-title="name"
                    item-value="_id"
                    variant="outlined"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.start_date"
                    label="Boshlanish sanasi"
                    hide-details
                    type="date"
                    :rules="rules"
                    color="primary"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.end_date"
                    label="Tugash sanasi"
                    hide-details
                    type="date"
                    :rules="rules"
                    color="primary"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.description"
                    label="Izoh"
                    no-resize
                    hide-details
                    :rules="rules"
                    color="primary"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="file"
                    :prepend-icon="null"
                    label="Fayl"
                    :rules="rules"
                    hide-details
                    show-size
                    color="primary"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12">
                  <v-btn
                    variant="flat"
                    color="primary"
                    block
                    @click="validate"
                    height="45"
                  >
                    Saqlash
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import axios from "../../axios";
import { useStore } from 'vuex'
import { semesterYearArray } from "../../plugins/semesters";

const headers = [
  { title: "Talaba", sortable: false, key: "student" },
  { title: "Guruh", sortable: false, key: "group" },
  { title: "Hodim", sortable: false, key: "inspector" },
  { title: "Boshlanish sanasi", sortable: false, key: "start_date" },
  { title: "Tugash sanasi", sortable: false, key: "end_date" },
  { title: "Izoh", sortable: false, key: "description" },
  { title: "Fayl", sortable: false, key: "file" },
];
const store = useStore()
const rules = [(v) => !!v || "Required"];
const search = ref("");
const form = ref(null);
const file = ref(null);
const groups = ref([]);
const users = ref([]);
const items = ref([]);
const dialog = ref(false);
const editedItem = ref({
  student: null,
  group: null,
  start_date: '',
  end_date: '',
  description: ''
});
const defaultItem = {
  student: null,
  group: null,
  start_date: '',
  end_date: '',
  description: ''
}

watch(dialog, (v) => v || close());

const initialize = async (distance) => {
  const result = await Promise.all([axios.get(`/attendence/exp?${distance||''}`),await axios.get('/group')]);
  items.value = result[0].data;
  if(distance) return
  groups.value = result[1].data;
},
validate = async () => {
  const { valid } = await form.value.validate();
  if (valid) save();
},
close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem);
    form.value?.reset();
  });
},
save = async () => {
  const formdata = new FormData()
  Object.keys(editedItem.value).map(e => {
    formdata.append(e, editedItem.value[e])
  })
  formdata.append('inspector', store.getters.userid)
  formdata.append('file', file.value[0])
  const { data } = await axios.post("/attendence/exp", formdata, { headers: { 'Content-Type': 'multipart/form-data' } });
  items.value.push(data);
  close();
};

const getUsers = async () => {
  if (!editedItem.value.group) return;
  const { data } = await axios.get(`/user/student?group=${editedItem.value.group}&status=aktiv`);
  users.value = data;
};

const getDateByYear = (date) => {
  delete date.title;
  initialize(new URLSearchParams(date).toString());
};

initialize();
</script>