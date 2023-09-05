<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface"
          width="100%" class="pa-2 py-4" rounded >
          <v-row justify="space-between">
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
              <v-btn
                block height="42"
                color="primary"
                @click="dialog = true"
                variant="flat"
                >Yangi O'qituvchi</v-btn
              >
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-sheet elevation="1"
          color="surface" width="100%"
          class="pa-2" rounded
        >
          <div class="responsive-datatable">
            <v-data-table no-data-text="Hech narsa topilmadi" items-per-page-text :headers="headers" :search="search" :items="items">
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
                      @click="deleteItem(item.raw)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </td>
              </template>

              <template #item.name="{ index, item }">
                <td data-label="Ism familiyasi">{{ index + 1 }}. {{ item.raw.name }}</td>
              </template>
              <template #item.login="{ item }">
                <td data-label="Login">{{ item.raw.login }}</td>
              </template>
              <template #item.phone="{ item }">
                <td data-label="Telefoni">{{ item.raw.phone }}</td>
              </template>
              <template #item.subjects="{ item }">
                <td data-label="Fanlar">
                  <div style="display: flex; gap: 5px;">
                    <v-chip label color="primary" size="small" v-for="subj, i in item.raw.accesssubjects" :key="i">
                      {{ subj }}
                    </v-chip>
                  </div>
                </td>
              </template>

              <template #item.group="{ item }">
                <td data-label="Guruhlar">
                  <div style="display: flex; gap: 5px;">
                    <v-chip label color="primary" size="small" v-for="gr, i in getGroupsName(item.raw.accessgroup)" :key="i">
                      {{ gr }}
                    </v-chip>
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
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.phone"
                    label="Telefon raqami"
                    hide-details :rules="rules"
                    color="primary"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="editedItem.accessgroup"
                    label="Biriktirilgan guruhlar"
                    hide-details multiple
                    :items="groups" chips
                    color="primary"
                    item-title="name"
                    item-value="_id"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="editedItem.accesssubjects"
                    label="Biriktirilgan fanlar"
                    hide-details multiple
                    :items="subjects" chips
                    color="primary"
                    item-title="name"
                    item-value="name"
                    variant="outlined"
                  />
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
                  <v-btn variant="flat"
                    color="primary"
                    block @click="validate"
                    height="45">
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
  { title: "Ism familiyasi", key: "name" },
  { title: "Login", key: "login", sortable: false },
  { title: "Telefoni", key: "phone", sortable: false },
  { title: "Guruhlar", key: "group", sortable: false },
  { title: "Fanlar", key: "subjects", sortable: false },
  { title: "Boshqarish", key: "actions", sortable: false },
];

const rules = [(v) => !!v || "Required"];
const form = ref(null);

const search = ref("");
const items = ref([]);
const groups = ref([]);
const subjects = ref([]);
const dialog = ref(false);
const editedIndex = ref(-1);
const editedId = ref(null);
const editedItem = ref({
  name: "",
  phone: "",
  login: "",
  password: "",
  role: "teacher",
  accessgroup: [],
  accesssubjects: [],
});
const defaultItem = {
  name: "",
  phone: "",
  login: "",
  password: "",
  role: "teacher",
  accessgroup: [],
  accesssubjects: [],
};
const formTitle = computed(() =>
  editedIndex.value === -1 ? "O'qituvchi yaratish" : "O'qituvchi o'zgartirish"
);

watch(dialog, (v) => v || close());

const initialize = async () => {
    const result = await Promise.all([axios.get("/user/teacher"), axios.get("/group"), axios.get("/subject")])
    items.value = result[0].data
    groups.value = result[1].data
    subjects.value = result[2].data
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
    const { data } = await axios.delete(`/user/${editedId.value}`);
    if (data) {
      items.value.splice(editedIndex.value, 1);
      close();
    }
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
      const { data } = await axios.put(`/user/${editedId.value}`, editedItem.value);
      Object.assign(items.value[editedIndex.value], data);
    } else {
      const { data } = await axios.post("/user", editedItem.value);
      items.value.push(data);
    }
    close();
  },
  
  getGroupsName = (arr) => {
    return arr.map(gid => groups.value.find(({_id}) => _id === gid).name)
  };

initialize();
</script>