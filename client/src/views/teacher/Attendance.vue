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
          <div class="d-flex justify-center">DAVOMAT</div>
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
                v-model="attendance.subject"
                label="Fan" density="comfortable"
                hide-details
                @update:modelValue="getUsers"
                :items="sciences"
                color="primary"
                item-title="name"
                item-value="name"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <v-select
                v-model="attendance.group"
                label="Guruh"
                :disabled="!attendance.subject"
                @update:modelValue="getUsers"
                hide-details density="comfortable"
                :items="groups"
                color="primary"
                item-title="name"
                item-value="_id"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-btn color="primary"
                @click="send" block
                elevation="0" :disabled="selected.length===0"
                height="40px"
              >
                Kiritish
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
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="users" items-per-page-text
            item-value="_id" items-per-page="-1"
            item-selectable="att" no-data-text="Hech narsa topilmadi"
            show-select density="compact">
            <template #bottom></template>  
          </v-data-table>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "../../axios";
import { useStore } from 'vuex'

const selected = ref([]);
const groups = ref([]);
const store = useStore()
const sciences = ref([]);
const attendance = ref({
  group: null,
  subject: null,
});
const headers = [
  {
    title: "Talaba ism-familiyasi",
    align: "start",
    sortable: false,
    key: "name",
  }
];
const users = ref([]);

const init = async () => {
  const resp = await Promise.all([axios.get("/group/access"), axios.get("/subject/access")]);

  groups.value = resp[0].data;
  sciences.value = resp[1].data;
};

const getUsers = async () => {
  if(!attendance.value.group || !attendance.value.subject) return
  
  const { data } = await axios.get(`/attendence/id/${attendance.value.group}?subject=${attendance.value.subject}`);
  users.value = data;
};

const send = async () => {
    if(selected.value.length === 0 || !attendance.value.subject) return
    const fdata = selected.value.map(student => {
        Object.assign(users.value.find(u => u._id === student), { att: false })
        return {
          ...attendance.value, student,
          date: new Date().toLocaleString(),
          teacher: store.getters.userid,
        }
    })
    selected.value = []
    await axios.post('/attendence', fdata)
};

init();
</script>