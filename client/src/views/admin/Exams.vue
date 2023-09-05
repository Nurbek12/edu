<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1"
          color="surface"
          width="100%"
          class="pa-2 py-4"
          rounded >
          <v-row justify="space-between" align="center">
            <v-col class="py-1" cols="12" sm="4">
              <v-text-field
                label="Qidirish"
                v-model="search"
                variant="outlined"
                color="primary"
                density="compact"
                hide-details
              />
            </v-col>
            <v-col class="py-1" cols="12" sm="4" md="3">
              <v-btn block height="42"
                color="primary"
                @click="dialog = true"
                variant="flat"
                >Imtihon yaratish</v-btn
              >
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2" rounded>
          <div class="responsive-datatable">
            <v-data-table items-per-page-text :headers="headers" :search="search" :items="items">
              <template #item.name="{ index, item }">
                <td data-label="Test baza">{{ index + 1 }}. {{ item.raw?.test?.name }}</td>
              </template>
              <template #item.subject="{ item }">
                <td data-label="Fan">{{ item.raw?.test?.subject }}</td>
              </template>
              <template #item.date="{ item }">
                <td data-label="Sanasi">{{ item.raw.date }}</td>
              </template>
              <template #item.time="{ item }">
                <td data-label="Berilgan vaqt">{{ item.raw.time }}</td>
              </template>
              <template #item.group="{ item }">
                <td data-label="Guruhlar">
                  <div style="display: flex; gap: 5px;">
                    <v-chip label color="primary" size="small" v-for="gr, i in getGroupsName(item.raw.groups)" :key="i">
                      {{ gr }}
                    </v-chip>
                  </div>
                </td>
              </template>
              <template #item.count="{ item }">
                <td data-label="Savollar soni">{{ item.raw.count }}</td>
              </template>

              <template v-slot:item.actions="{ item }">
                <td data-label="Boshqarish">
                  <div class="d-flex justify-end align-center">
                    <v-btn variant="flat"
                      size="30" color="primary"
                      @click="editItem(item.raw)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn variant="flat" class="ml-1"
                      size="30" color="primary"
                      @click="deleteItem(item.raw)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
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
    <v-dialog v-model="dialog" max-width="550px">
      <v-card class="test-scroll">
        <v-card-title class="mt-2 ml-2 mb-0">
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text class="px-2 pt-0">
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedItem.test"
                    label="Test bazasi" :rules="rules"
                    hide-details
                    :items="tests"
                    color="primary"
                    item-title="name"
                    item-value="_id"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.date"
                    label="Test vaqti" type="date"
                    hide-details :rules="rules"
                    color="primary"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.time"
                    label="Testga beriladigan vaqt (minut)"
                    hide-details :rules="rules"
                    type="number" min="0"
                    color="primary"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.count"
                    label="Savollar soni"
                    hide-details :rules="rules"
                    type="number" min="0"
                    color="primary"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="editedItem.groups"
                    label="Guruhlar"
                    hide-details multiple
                    :items="groups" chips
                    color="primary" :rules="rules"
                    item-title="name"
                    item-value="_id"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12">
                  <v-btn variant="flat"
                    color="primary"
                    block @click="validate"
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

const headers = [
  { title: "Test baza", key: "name" },
  { title: "Fan", key: "subject", sortable: false },
  { title: "Guruhlar", key: "group", sortable: false },
  { title: "Sanasi", key: "date", sortable: false },
  { title: "Berilgan vaqt", key: "time", sortable: false },
  { title: "Savollar soni", key: "count", sortable: false },
  { title: "Boshqarish", key: "actions", sortable: false },
];

const rules = [(v) => !!v || "Required"];
const form = ref(null);
const form1 = ref(null);
const search = ref("");
const items = ref([]);
const dialog = ref(false);
const editedIndex = ref(-1);
const editedId = ref(-1);
const groups = ref([]);
const tests = ref([]);
const questions = ref([]);


const editedItem = ref({
  groups: [],
  test: null,
  count: 0,
  time: 0,
  date: "",
});
const defaultItem = {
  test: null,
  groups: [],
  count: 0,
  time: 0,
  date: "",
};
const formTitle = computed(() =>
  editedIndex.value === -1 ? "Imtihon Yaratish" : "Imtihonni O'zgartirish"
);

watch(dialog, (v) => v || close());

const initialize = async () => {
    const [groupdata, testdata, examdata] = await Promise.all([
      axios.get("/group"),
      axios.get("/test"),
      axios.get("/exam"),
    ]);
    items.value = examdata.data
    tests.value = testdata.data;
    groups.value = groupdata.data;
  },
  validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
  },
  editItem = (item) => {
    editedIndex.value = items.value.indexOf(item);
    editedId.value = item._id;
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
  },
  deleteItem = (item) => {
    editedIndex.value = items.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    editedId.value = item._id;
    if(confirm("Ushbu malumotni o'chirmoqchimisiz?")){
      deleteItemConfirm()
    }else{
      close()
    }
  },
  deleteItemConfirm = async () => {
    const { data } = await axios.delete(`/exam/${editedId.value}`);
    if (data) {
      items.value.splice(editedIndex.value, 1);
      close();
    }
  },
  close = () => {
    dialog.value = false;
    nextTick(() => {
      editedItem.value = Object.assign({}, defaultItem);
      editedId.value = -1;
      editedIndex.value = -1;
      form.value?.reset()
    });
  },
  save = async () => {
    if (editedIndex.value > -1) {
      const { data } = await axios.put(`/exam/${editedId.value}`, editedItem.value);
      Object.assign(items.value[editedIndex.value], data);
    } else {
      const { data } = await axios.post("/exam", {
        questions: questions.value,
        ...editedItem.value,
      });
      items.value.push(data);
    }
    close();
  },
  
  getGroupsName = (arr) => {
    return arr.map(gid => groups.value.find(({_id}) => _id === gid).name)
  };

initialize();
</script>