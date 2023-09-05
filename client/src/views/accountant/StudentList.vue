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
          <v-row justify="start" align="center">
            <v-col class="py-1" cols="12" sm="4">
              <v-select
                v-model="group"
                label="Guruh"
                @update:modelValue="getUsers"
                hide-details
                density="compact"
                :items="groups"
                color="primary"
                item-title="name"
                item-value="_id"
                variant="outlined"
              />
            </v-col>
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
              items-per-page="-1"
              items-per-page-text
              no-data-text="Hech narsa topilmadi"
              :headers="headers"
              :search="search"
              :items="items"
            >
              <template v-slot:item.actions="{ index, item }">
                <td data-label="Boshqarish">
                  <div class="d-flex justify-end">
                    <v-btn variant="flat"
                      color="primary" size="30"
                      @click="show(item.raw.contract)">
                      <v-icon>mdi-calendar</v-icon>
                    </v-btn>
                    <v-btn variant="flat" class="ml-1"
                      color="primary" size="30"
                      @click="save(item.raw, index)">
                      <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                  </div>
                </td>
              </template>
              <template #bottom></template>
              <template #item.name="{ index, item }">
                <td data-label="Ism familiyasi">
                  {{ index + 1 }}. {{ item.raw.name }}
                </td>
              </template>
              <template #item.phone="{ item }">
                <td data-label="Telefoni">{{ item.raw.phone }}</td>
              </template>
              <template #item.total="{ item }">
                <td data-label="Kontrakt">{{ item.raw.total }}</td>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog max-width="450" v-model="dialog">
      <v-card>
        <v-card-title class="text-h6 d-flex justify-space-between align-center">
          To'lovlar ro'yxati
          <v-spacer></v-spacer>
          <v-btn size="30" color="primary" @click="close">
            <v-icon size="small">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-2">
          <!-- <div class="responsive-datatable"> -->
            <v-data-table no-data-text="Hech narsa topilmadi" items-per-page-text items-per-page="-1" :headers="headers2" :items="transactionList">
              <template #item.amount="{ index, item }">
                <td data-label="Summasi">{{ index + 1 }}. {{ item.raw.amount }}</td>
              </template>
              <template #bottom></template>
              <template #item.date="{ item }">
                <td data-label="Sanasi">{{ item.raw.date }}</td>
              </template>
            </v-data-table>
          <!-- </div> -->
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "../../axios";

const headers = [
  { title: "Ism familiyasi", key: "name" },
  { title: "Telefoni", key: "phone" },
  { title: "Kontrakt", key: "total" },
  { title: "Boshqarish", align: "start", key: "actions", sortable: false },
];

const headers2 = [
  { title: "To'lov summasi", key: "amount" },
  { title: "To'lov sanasi", key: "date" },
];

const search = ref("");
const items = ref([]);
const groups = ref([]);
const group = ref(null);
const dialog = ref(false)
const transactionList = ref([])

const initialize = async () => {
    const { data } = await axios.get("/group");
    groups.value = data;
  },
  save = async (item, i) => {
    const amount = prompt("Kontrakt summasi");
    if (isNaN(amount) || amount === "" || amount === null) return;
    if (confirm(`${item.name} ga ${amount} pul o'tkazilsinmi?`)) {
      const {data} = await axios.post("/user/contract", {
        student: item._id,
        amount: parseInt(amount),
        date: new Date().toLocaleString(),
      });
      Object.assign(items.value[i], {
        total: item.total + parseInt(amount),
        contract: [...item.contract, data]
      });
    }
  },
  show = (list) => {
    dialog.value = true
    transactionList.value = list
  },
  close = () => {
    dialog.value = false
    transactionList.value = []
  },
  getUsers = async () => {
    const { data } = await axios.get(`/user/contract/${group.value}`);
    items.value = data;
  };

initialize();
</script>