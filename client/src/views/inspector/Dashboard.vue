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
          <div class="d-flex justify-center">
            {{ store.getters.user?.name || "Bosh Sahifa" }}
          </div>
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
            <v-data-table items-per-page-text :headers="headers" :sort-by="[{ field: 'name', direction: 'asc' }]" no-data-text="Hech narsa topilmadi" :search="search" :items="items">
              <template #item.name="{ index, item }">
                <td data-label="Talaba">{{ index + 1 }}. {{ item.raw.user }}</td>
              </template>
              <template #item.test="{ item }">
                <td data-label="Test baza">{{ item.raw.test }}</td>
              </template>
              <template #item.time="{ item }">
                <td data-label="Kirgan vaqti">{{ item.raw.time }}</td>
              </template>
              <template #item.ip="{ item }">
                <td data-label="IP">{{ item.raw.ip }}</td>
              </template>
              <template #item.device="{ item }">
                <td data-label="Qurilma">{{ item.raw.device }}</td>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import io from 'socket.io-client'

const socket = io('/')
const headers = [
  { title: "Talaba", key: "name" },
  { title: "Test baza", key: "test", sortable: false },
  { title: "Kirgan vaqti", key: "time", sortable: false },
  { title: "IP", key: "ip", sortable: false },
  { title: "Qurilma", key: "device", sortable: false },
];
const store = useStore()
const search = ref('')
const items = ref([])

socket.emit('req-data')

socket.on('send-admin', (data) => {
    items.value = data
    console.log(data);
})
</script>