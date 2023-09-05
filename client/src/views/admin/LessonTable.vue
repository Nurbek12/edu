<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2 py-4" rounded>
          <v-row justify="space-between" align="center">
            <v-col cols="12" class="py-1" sm="4">
              <v-select v-model="editedItem.group"
                label="Guruhni tanlang" @update:modelValue="getTable"
                hide-details :items="groups" density="compact"
                color="primary" item-title="name" 
                item-value="_id" variant="outlined" />
            </v-col>
            <v-col cols="12" class="py-1" sm="4">
              <v-select label="Semestr" :disabled="!editedItem.group" @update:modelValue="getDateByYear"
                hide-details :items="semesterYearArray" density="compact"
                color="primary" item-title="title" return-object variant="outlined" />
            </v-col>
            <v-col cols="12" class="py-1" sm="4">
              <v-btn block color="primary" :disabled="!editedItem.group"
                @click="dialog = true" variant="flat" height="42"
                >Jadval yaratish</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(w, i) in weeks" :key="i" cols="12" sm="6">
        <v-card>
          <v-card-text class="pa-0">
            <v-sheet color="surface" class="px-4 py-2">
              <span class="text-h6">{{ w }}</span>
            </v-sheet>
          </v-card-text>
          <v-card-text class="px-0 pt-0">
            <div class="responsive-datatable">
              <v-data-table density="comfortable" hide-no-data items-per-page-text :headers="headers" :items="items[w] || []">
                <template #bottom></template>
                <template #item.name="{ item }">
                  <td data-label="Fan Nomi">{{ item.raw.index }}. {{ item.raw.subject }}</td>
                </template>
                <template #item.teacher="{ item }">
                  <td data-label="O'qituvchi">{{ item.raw.teacher?.name }}</td>
                </template>
                <template #item.room="{ item }">
                  <td data-label="Auditoriya">{{ item.raw.room }}</td>
                </template>
                <template #item.actions="{ item }">
                  <td data-label="Boshqarish">
                    <div class="d-flex justify-end align-center">
                      <v-btn size="30" elevation="0"
                        color="primary" @click="editItem(item.raw)">
                        <v-icon size="small">mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn size="30" elevation="0"
                        color="primary" class="ml-1"
                        @click="deleteItem(item.raw)">
                        <v-icon size="small">mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </td>
                </template>
              </v-data-table>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="550px">
      <v-card>
        <v-card-title class="mt-2 ml-2 mb-0">
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text class="px-2 pt-0">
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-select v-model="editedItem.day"
                    label="Hafta kuni" :rules="rules"
                    hide-details :items="weeks"
                    color="primary" variant="outlined" />
                </v-col>
                <v-col cols="12">
                  <v-select v-model="editedItem.index"
                    label="Dars soati" :rules="rules"
                    hide-details :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
                    color="primary" variant="outlined" />
                </v-col>
                <v-col cols="12">
                  <v-select v-model="editedItem.subject"
                    label="Fan nomi" :rules="rules"
                    hide-details :items="subjects"
                    color="primary" item-title="name" 
                    item-value="name" variant="outlined" />
                </v-col>
                <v-col cols="12">
                  <v-select v-model="editedItem.teacher"
                    label="O'qituvchi" :rules="rules"
                    hide-details :items="teachers"
                    color="primary" item-title="name" 
                    item-value="_id" variant="outlined" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.room"
                    label="Auditoriya" :rules="rules" hide-details
                    color="primary" variant="outlined" />
                </v-col>
                <v-col cols="12">
                  <v-btn variant="flat" color="primary" block
                    @click="validate" height="45">
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
import { semesterYearArray } from '../../plugins/semesters'

const weeks = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
];
const headers = [
  { title: "Fan nomi", key: "name" },
  { title: "O'qituvchi", key: "teacher" },
  { title: "Auditoriya", key: "room" },
  { title: "Boshqarish", key: "actions", sortable: false },
];
const rules = [(v) => !!v || "Required"];
const groupby = [{ key: "index", order: "asc" }]

const search = ref("");
const form = ref(null);

const items = ref({
  Dushanba: [],
  Seshanba: [],
  Chorshanba: [],
  Payshanba: [],
  Juma: [],
  Shanba: [],
});
const teachers = ref([]);
const groups = ref([]);
const subjects = ref([]);

const dialog = ref(false);
const editedIndex = ref(-1);
const editedId = ref(-1);
const editedItem = ref({
  group: null,
  teacher: null,
  subject: null,
  day: null,
  index: null,
  room: ''
});
const defaultItem = {
  teacher: null,
  subject: null,
  day: null,
  index: null,
  room: ''
};
const formTitle = computed(() =>
  editedIndex.value === -1 ? "Fan Yaratish" : "Fanni O'zgartirish"
);

watch(dialog, (v) => v || close());

const initialize = async () => {
    const resp = await Promise.all([axios.get('/user/teacher'), axios.get('/group'), axios.get('/subject')])
    teachers.value = resp[0].data
    groups.value = resp[1].data
    subjects.value = resp[2].data
  },
  getTable = async (distance) => {
    const { data } = await axios.get(`/table?group=${editedItem.value.group}&${distance}`)
    items.value = Object.assign({}, data)
  },
  validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save();
  },
  editItem = (item) => {
    editedIndex.value = items.value[item.day].indexOf(item);
    editedId.value = item._id;
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
  },
  deleteItem = (item) => {
    editedIndex.value = items.value[item.day].indexOf(item);
    editedItem.value = Object.assign({}, item);
    editedId.value = item._id;
    if(confirm("Ushbu malumotni o'chirmoqchimisiz?")){
      deleteItemConfirm()
    }else{
      close()
    }
  },
  deleteItemConfirm = async () => {
    const { data } = await axios.delete(`/table/${editedId.value}`);
    if (data) {
      items.value[editedItem.value.day].splice(editedIndex.value, 1);
      close();
    }
  },
  close = () => {
    dialog.value = false;
    nextTick(() => {
      editedItem.value = Object.assign({}, {...defaultItem, group: editedItem.value.group});
      editedId.value = -1;
      editedIndex.value = -1;
      form.value?.reset();
    });
  },
  save = async () => {
    if (editedIndex.value > -1) {
      const { data } = await axios.put(`/table/${editedId.value}`, editedItem.value);
      Object.assign(items.value[editedItem.value.day][editedIndex.value], data);
    } else {
      const { data } = await axios.post("/table", editedItem.value);
      if(items.value[editedItem.value.day]){
        items.value[editedItem.value.day].push(data);
      }else{
        items.value[editedItem.value.day] = [data]
      }
    }
    close();
  },
  getDateByYear = (date) => {
    delete date.title;
    getTable((new URLSearchParams(date)).toString())
  };

initialize('');
</script>