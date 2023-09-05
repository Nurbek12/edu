<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface"
          width="100%" class="pa-2 py-4" rounded>
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
                >Yangi Talaba</v-btn
              >
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-sheet elevation="1"
          color="surface" width="100%"
          class="pa-2" rounded>
          <div class="responsive-datatable">
            <v-data-table-server
              v-model:items-per-page="itemsPerPage"
              :search="search"
              :headers="headers"
              :items-length="totalItems"
              :items="serverItems"
              :loading="loading"
              class="elevation-1" items-per-page-text
              item-value="name" no-data-text="Hech narsa topilmadi"
              @update:options="loadItems"
            >
              <template v-slot:item.actions="{ item }">
                <td data-label="Boshqarish">
                  <div class="d-flex justify-end">
                    <v-btn variant="flat" size="30" color="primary" @click="editItem(item.raw)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>
                </td>
              </template>

              <template #item.name="{ index, item }">
                <td data-label="Ismi">{{ index + 1 }}. {{ item.raw.name }}</td>
              </template>
              <template #item.group="{ item }">
                <td data-label="Guruhi">
                  <v-chip label color="primary">{{ getGroup(item.raw.group) }}</v-chip>
                </td>
              </template>
              <template #item.login="{ item }">
                <td data-label="Login">{{ item.raw.login }}</td>
              </template>
              <template #item.phone="{ item }">
                <td data-label="Telefoni">{{ item.raw.phone }}</td>
              </template>
              <template #item.start="{ item }">
                <td data-label="Boshlagan yili">{{ item.raw.start_year }}</td>
              </template>
              <template #item.status="{ item }">
                <td data-label="Holati">
                  <v-chip label :color="{aktiv: 'blue', chetlashtirilgan: 'red'}[item.raw.status]">{{ item.raw.status }}</v-chip>
                </td>
              </template>
              <template #item.birthdate="{ item }">
                <td data-label="Tugilgan sanasi">{{ item.raw.birthdate }}</td>
              </template>
            </v-data-table-server>
          </div>
        </v-sheet>
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
                  <v-text-field
                    v-model="editedItem.name"
                    label="Ism familiya"
                    hide-details :rules="rules"
                    color="primary"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedItem.group"
                    label="Guruhi" :rules="rules"
                    hide-details :items="groups"
                    color="primary" item-title="name" item-value="_id"
                    variant="outlined" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="editedItem.start_year"
                    label="O'qishni boshlagan yili"
                    :rules="rules" hide-details :items="year_items"
                    color="primary" variant="outlined" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.phone"
                    label="Telefon raqami"
                    hide-details :rules="rules"
                    color="primary"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.birthdate"
                    label="Tug'ilgan sanasi"
                    hide-details type="date"
                    color="primary" :rules="rules"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.login"
                    label="Login"
                    hide-details :rules="rules"
                    color="primary"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.password"
                    label="Parol"
                    hide-details :rules="editedId?[]:rules"
                    color="primary"
                    variant="outlined"
                  ></v-text-field>
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

const rules = [(v) => !!v || "Required"];
const headers = [
  { title: "Ism familiyasi", key: "name", sortable: false },
  { title: "Guruhi", key: "group", sortable: false },
  { title: "Login", key: "login", sortable: false },
  { title: "Telefoni", key: "phone", sortable: false },
  { title: "Tugilgan sanasi", key: "birthdate", sortable: false },
  { title: "Holati", key: "status", sortable: false},
  { title: "Boshlagan yili", key: "start", sortable: false },
  { title: "Boshqarish", align: "start", key: "actions", sortable: false },
];

const search = ref("");
const items = ref([]);
const year_items = [2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];
const dialog = ref(false);
const form = ref(null);
const editedIndex = ref(-1);
const editedId = ref(null);
const groups = ref([]);
const editedItem = ref({
  name: "",
  birthdate: "",
  phone: "",
  login: "",
  password: "",
  group: null,
  start_year: null,
  role: "student",
});
const defaultItem = {
  name: "",
  birthdate: "",
  phone: "",
  login: "",
  password: "",
  group: null,
  start_year: null,
  role: "student",
};
const formTitle = computed(() =>
  editedIndex.value === -1 ? "Talaba yaratish" : "Talabani o'zgartirish"
);

const itemsPerPage = ref(10);
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const name = ref('');

watch(dialog, (v) => v || close());

const initialize = async () => {
    const { data } = await axios.get('/group')
    groups.value = data
  },
  validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
  },
  editItem = (item) => {
    editedIndex.value = serverItems.value.indexOf(item);
    editedId.value = item._id;
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
  },
  close = () => {
    dialog.value = false;
    nextTick(() => {
      editedItem.value = Object.assign({}, defaultItem);
      editedId.value = null;
      editedIndex.value = -1;
      form.value?.reset()
    });
  },
  save = async () => {
    if (editedIndex.value > -1) {
      const { data } = await axios.put(`/user/${editedId.value}`, {...editedItem.value, status: 'aktiv'});
      if(data){
        Object.assign(serverItems.value[editedIndex.value], data);
        close()
      }else{
        editedItem.value.login = ''
      }
    } else {
      const { data } = await axios.post("/user", editedItem.value);
      if(data){
        serverItems.value.push(data);
        close()
      }else{
        editedItem.value.login = ''
      }
    }
  },

  getGroup = id => {
    return groups.value.find(({_id}) => _id === id)?.name
  },
  
  loadItems =  async ({ page, itemsPerPage, sortBy }) => {
    loading.value = true
      const { data } = await axios.get('/user/student/page', {
        params: {
          page: page,
          limit: itemsPerPage,
          search: search.value,
        },
      })
      serverItems.value = data.data
      totalItems.value = data.total
      loading.value = false
  };

initialize();
</script>