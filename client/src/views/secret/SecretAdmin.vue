<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%"
          class="pa-2" rounded >
          <v-row justify="start" align="center">
            <v-col cols="12" sm="4">
              <v-select
                label="Guruh"
                @update:modelValue="getResults($event)"
                hide-details
                density="compact"
                :items="groups"
                color="primary"
                item-title="name"
                item-value="_id"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field label="Qidirish" v-model="search" variant="outlined"
                color="primary" density="compact" hide-details />
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
            <v-data-table :headers="headers" :search="search" :items="items">
              <template v-slot:item.no="{ index }">
                <td data-label="T/r">{{ index + 1 }}.</td>
              </template>
              <template #item.test.name="{ item }">
                <td data-label="Test nomi">{{ item.raw.test.name }}</td>
              </template>
              <template #item.student.name="{ item }">
                <td data-label="Talaba">{{ item.raw.student?.name }}</td>
              </template>
              <template #item.group="{ item }">
                <td data-label="Guruhi">{{ item.raw.group?.name }}</td>
              </template>
              <template #item.rate="{ item }">
                <td data-label="Bahosi">
                  {{ item.raw.rate }} / {{ item.raw.questions }}
                </td>
              </template>
              <template #item.percent="{ item }">
                <td data-label="Foizi">
                  {{ parseFloat((item.raw.rate * 100) / item.raw.questions).toFixed(1) }} %
                </td>
              </template>
              <template #item.remove="{ item }">
                <td data-label="Ochirish">
                  <v-btn color="primary" size="30" variant="flat" @click="remove(item.raw._id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <template #item.view="{ item }">
                <td data-label="Ko'rish">
                  <v-btn color="primary" size="30" :to="`/secrettest/${item.raw._id}`">
                    <v-icon>mdi-eye-arrow-right</v-icon>
                  </v-btn>
                </td>
              </template>
              <template v-slot:item.actions="{ item }">
                <td data-label="Boshqarish">
                  <v-spacer></v-spacer>
                  <div class="d-flex justify-end">
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      size="40"
                      color="primary"
                      @click="editItem(item.raw)"
                    ></v-btn>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="40"
                      color="primary"
                      @click="deleteItem(item.raw)"
                    ></v-btn>
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
  </v-container>
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import axios from "../../axios";
import { useStore } from "vuex";

const store = useStore();
const headers = [
  { title: "T/r", align: "start", key: "no", sortable: false },
  { title: "Test Nomi", key: "test.name" },
  { title: "Talaba", key: "student.name" },
  { title: "Guruhi", key: "group" },
  { title: "Bahosi", key: "rate" },
  { title: "Foizi", key: "percent" },
  { title: "Ko'rish", key: "view" },
  { title: "O'chirish", key: "remove" },
];

const search = ref("");
const items = ref([]);
const groups = ref([]);

const initialize = async () => {
  const { data } = await axios.get(`/group`);
  groups.value = data
};

const getResults = async (id) => {
  const { data } = await axios.get(`/test/result?group=${id}`);
  items.value = data;
};

// secrettest
async function remove(id){
  if(confirm('O\'chirishga rozimisiz')){
    const { data } = await axios.delete(`/test/result/${id}`)
    if(data){
        const ind = items.value.findIndex((i) => i._id === id)
        items.value.splice(ind, 1)
    }
  }
}

initialize();
</script>