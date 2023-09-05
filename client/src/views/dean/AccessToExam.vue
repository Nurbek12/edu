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
          <div class="d-flex justify-center">RUXSAT BERISH</div>
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
            <v-col cols="12" class="pb-0">
              <v-select
                v-model="accessexam"
                label="Imtihon" density="comfortable"
                :rules="rules"
                hide-details @update:modelValue="getUsers"
                :items="tests"
                color="primary"
                item-title="name"
                return-object
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="accessgroup"
                label="Guruh"
                :rules="rules" :disabled="!accessexam"
                @update:modelValue="getUsers"
                hide-details density="comfortable"
                :items="accessexam?.groups||[]"
                color="primary"
                item-title="name"
                item-value="_id"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                label="Qidirish"
                v-model="search"
                variant="outlined"
                color="primary"
                density="compact"
                hide-details
              />
            </v-col>
            <v-col cols="12">
              <v-btn color="primary"
                @click="send" block
                elevation="0" :disabled="selected.length===0"
                height="40px"
              >
                Ruxsat berish
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="8">
        <v-sheet elevation="1"
          color="surface"
          width="100%"
          class="py-2 px-0"
          rounded>
          <!-- <div class="responsive-datatable"> -->
            <v-data-table v-model="selected" :headers="headers" :search="search"
              :items="users" items-per-page-text
              item-value="_id" items-per-page="-1"
              item-selectable="att" no-data-text="Hech narsa topilmadi"
              show-select density="compact">
              <template #item.name="{ item }">
                <td data-label="Talaba">{{ item.raw.name }}</td>
              </template>
              <template #item.total="{ item }">
                <td data-label="Kontrakt">{{ item.raw.total }}</td>
              </template>
              <template #bottom></template>  
            </v-data-table>
          <!-- </div> -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "../../axios";
import { useStore } from 'vuex'

const rules = [(v) => !!v || "Required"];
const selected = ref([]);
const search = ref("");
const groups = ref([]);
const store = useStore()
const tests = ref([]);
const accessexam = ref(null);
const accessgroup = ref(null);
const headers = [
  { title: "Talaba", align: "start", sortable: false, key: "name" },
  { title: "Kontrakt", sortable: false, key: "total" },
];
const users = ref([]);

const init = async () => {
  const { data } = await axios.get("/exam/list");
  tests.value = data;
};

const getUsers = async () => {
  if(!accessgroup.value || !accessexam.value) return
  const { data } = await axios.get(`/test/access/${accessgroup.value}/${accessexam.value._id}`);
  users.value = data;
};

const send = async () => {
    if(selected.value.length === 0) return
    const fdata = selected.value.map(student => {
        Object.assign(users.value.find(u => u._id === student), { att: false })
        return {
            exam: accessexam.value._id,
            group: accessgroup.value,
            test: accessexam.value.test,
            student: student,
            status: 'created',
            subject: accessexam.value.subject
        }
    })
    selected.value = []
    await axios.post('/test/access', fdata)
};

init();
</script>