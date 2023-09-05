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
          <div class="d-flex justify-center">DARS JADVALI</div>
        </v-sheet>
      </v-col>
      <v-col v-for="(w, i) in weeks" :key="i" cols="12" sm="6" md="4">
        <v-card>
          <v-card-text class="pa-0">
            <v-sheet color="surface" class="px-4 py-2">
              <span class="text-h6">{{ w }}</span>
            </v-sheet>
          </v-card-text>
          <v-card-text class="px-0">
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">Fan Nomi</th>
                  <th class="text-left">O'qituvchi</th>
                  <th class="text-left">Auditoriya</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(t, j) in items[w] || []" :key="j">
                  <td>{{ t.index }}. {{ t.subject }}</td>
                  <td>{{ t.teacher?.name }}</td>
                  <td>{{ t.room }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <FooterPage @getDate="init" />
</template>

<script setup>
import { ref } from "vue";
import axios from "../../axios"
import FooterPage from '../../components/FooterPage.vue'

const items = ref({});
const weeks = [ "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"]

const init = async (distance) => {
  const { data } = await axios.get(`/table?${distance||''}`);
  items.value = data;
};

init()
</script>