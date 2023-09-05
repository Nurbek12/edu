<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2 py-4" rounded>
          <v-row justify="space-between" align="center">
            <v-col cols="12" class="py-1" sm="4">
              <v-text-field label="Qidirish" v-model="search" variant="outlined" color="primary" density="compact" hide-details />
            </v-col>
            <v-col cols="12" class="py-1" sm="4">
              <v-btn block color="primary" @click="dialog = true" variant="flat" height="42">Fan yaratish</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2" rounded>
          <div class="responsive-datatable">
            <v-data-table items-per-page-text no-data-text="Hech narsa topilmadi" :headers="headers" :search="search" :items="items">
              <template v-slot:item.no="{ index }">
                <td data-label="T/r">{{ index + 1 }}.</td>
              </template>
              <template #item.name="{ item }">
                <td data-label="Fan nomi">{{ item.raw.name }}</td>
              </template>
              <template v-slot:item.actions="{ item }">
                <td data-label="Boshqarish">
                  <v-spacer></v-spacer>
                  <div class="d-flex justify-end align-center gap-4">
                    <v-btn size="30" elevation="0"
                      color="primary" @click="editItem(item.raw)">
                      <v-icon size="small">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn size="30" elevation="0" color="primary" class="ml-1" @click="deleteItem(item.raw)">
                      <v-icon size="small">mdi-delete</v-icon>
                    </v-btn>
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
                  <v-text-field v-model="editedItem.name" label="Fan Nomi" hide-details color="primary" :rules="rules" variant="outlined" />
                </v-col>
                <v-col cols="12">
                  <v-btn variant="flat" color="primary" block @click="validate" height="45">
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
  { title: "T/r", align: "start", key: "no", sortable: false },
  { title: "Fan Nomi", key: "name" },
  { title: "Boshqarish", key: "actions", sortable: false },
];
const rules = [(v) => !!v || "Required"];

const search = ref("");
const form = ref(null);
const items = ref([]);
const dialog = ref(false);
const editedIndex = ref(-1);
const editedId = ref(-1);
const editedItem = ref({
  name: "",
});
const defaultItem = {
  name: "",
};
const formTitle = computed(() =>
  editedIndex.value === -1 ? "Fan Yaratish" : "Fanni O'zgartirish"
);

watch(dialog, (v) => v || close());

const initialize = async () => {
    const { data } = await axios.get("/subject/");
    items.value = data;
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
    const { data } = await axios.delete(`/subject/${editedId.value}`);
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
      const { data } = await axios.put(`/subject/${editedId.value}`,editedItem.value);
      Object.assign(items.value[editedIndex.value], data);
    } else {
      const { data } = await axios.post("/subject", editedItem.value);
      items.value.push(data);
    }
    close();
  };

initialize();
</script>