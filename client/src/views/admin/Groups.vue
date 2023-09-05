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
          <v-row justify="space-between">
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
            <v-col class="py-1" cols="12" sm="4" md="3">
              <v-btn block height="42"
                color="primary"
                @click="dialog = true"
                variant="flat"
                >Guruh yaratish</v-btn
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
            <v-data-table items-per-page-text :headers="headers" :search="search" :items="items">
              <template v-slot:item.no="{ index }">
                <td data-label="T/r">{{ index + 1 }}.</td>
              </template>
              <template #item.name="{ item }">
                <td data-label="Fan nomi">{{ item.raw.name }}</td>
              </template>
              <template #item.users="{ item }">
                <td data-label="Talabalar soni">{{ item.raw.users }}</td>
              </template>
              <template v-slot:item.actions="{ item }">
                <td data-label="Boshqarish">
                  <div class="d-flex justify-end align-center">
                    <v-btn variant="flat"
                      size="30"
                      color="primary"
                      @click="viewItem(item.raw._id)"
                    >
                      <v-icon>mdi-list-box</v-icon>
                    </v-btn>
                    <v-btn variant="flat"
                      size="30" class="ml-1"
                      color="primary"
                      @click="editItem(item.raw)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn variant="flat"
                      size="30" class="ml-1"
                      color="primary"
                      @click="deleteItem(item.raw)"
                    >
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
      <v-card>
        <v-card-title class="mt-2 ml-2 mb-0">
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text class="px-2 pt-0">
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.name"
                    label="Guruh Nomi"
                    hide-details :rules="rules"
                    color="primary"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn variant="flat"
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
    <v-dialog max-width="850" v-model="dialogView">
      <v-card>
        <v-card-title class="text-h6 d-flex justify-space-between align-center">
          Guruhdagi o'quvchilar ruytati
          <v-spacer></v-spacer>
          <v-btn size="30" elevation="0" color="primary" @click="closeView">
            <v-icon size="small">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-2">
          <div class="responsive-datatable">
            <v-data-table no-data-text="Hech narsa topilmadi" items-per-page-text items-per-page="-1" :headers="studentheaders" :search="search" :items="users">
              <template #item.name="{ index, item }">
                <td data-label="Ism familiyasi">{{ index + 1 }}. {{ item.raw.name }}</td>
              </template>
              <template #bottom></template>
              <template #item.login="{ item }">
                <td data-label="Login">{{ item.raw.login }}</td>
              </template>
              <template #item.phone="{ item }">
                <td data-label="Telefoni">{{ item.raw.phone }}</td>
              </template>
              <template #item.birthdate="{ item }">
                <td data-label="Tugilgan sanasi">{{ item.raw.birthdate }}</td>
              </template>
            </v-data-table>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import axios from "../../axios";

const headers = [
  { title: "T/r", align: "start", key: "no", sortable: false },
  { title: "Guruh Nomi", key: "name" },
  { title: "Talabalar soni", key: "users" },
  { title: "Boshqarish", key: "actions", sortable: false },
];
const studentheaders = [
  { title: "Ism familiyasi", key: "name" },
  { title: "Login", key: "login" },
  { title: "Telefoni", key: "phone" },
  { title: "Tugilgan sanasi", key: "birthdate" },
];
const rules = [(v) => !!v || "Required"];

const search = ref("");
const items = ref([]);
const users = ref([]);
const form = ref(null);
const dialog = ref(false);
const dialogView = ref(false);
const editedIndex = ref(-1);
const editedId = ref(-1);
const editedItem = ref({
  name: "",
});
const defaultItem = {
  name: "",
};
const formTitle = computed(() =>
  editedIndex.value === -1 ? "Guruh Yaratish" : "Guruhni O'zgartirish"
);

watch(dialog, (v) => v || close());
watch(dialogView, (v) => v || closeView());

const initialize = async () => {
    const { data } = await axios.get("/group?users=1");
    items.value = data;
  },
  
  validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
  },
  viewItem = async (id) => {
    const { data } = await axios.get(`/user/student?group=${id}`)
    users.value = data
    dialogView.value = true
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
    const { data } = await axios.delete(`/group/${editedId.value}`);
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
  closeView = () => {
    dialogView.value = false;
    nextTick(() => {
      users.value = []
    });
  },
  save = async () => {
    if (editedIndex.value > -1) {
      const { data } = await axios.put(`/group/${editedId.value}`, editedItem.value);
      Object.assign(items.value[editedIndex.value], data);
    } else {
      const { data } = await axios.post("/group", editedItem.value);
      items.value.push({...data, users: 0});
    }
    close();
  };

initialize();
</script>