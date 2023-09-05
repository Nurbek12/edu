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
          <div class="d-flex justify-center">TESTLAR</div>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-timeline density="compact">
          <v-timeline-item v-for="(e, i) in exams" :key="i"  size="small" dot-color="primary" max-width="550px" width="100%">
            <v-row align="center">
              <v-col cols="12">
                <v-card width="100%" elevation="2" rounded class="pt-4 pb-3">
                  <v-card-title class="py-1">Imtihon testi</v-card-title>
                  <v-card-text class="py-1">Test bazasi: {{ e.test?.name }}</v-card-text>
                  <v-card-text class="py-1">Test sanasi: {{ e.date }}</v-card-text>
                  <v-card-text class="py-1">Savollar soni: {{ e.count }}</v-card-text>
                  <v-card-text class="py-1">Berilgan muhlati: {{ e.time }} min</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-timeline-item>
          <v-timeline-item v-for="(e, i) in midterm" :key="i" size="small" dot-color="primary" max-width="550px" width="100%">
            <v-row align="center">
              <v-col cols="12">
                <v-card width="100%" elevation="2" rounded class="pt-4 pb-3">
                  <v-card-title class="py-1">Oraliq testi</v-card-title>
                  <v-card-text class="py-1">Test nomi: {{ e.name }}</v-card-text>
                  <v-card-text class="py-1">Testlar soni: {{ e.count }}</v-card-text>
                  <v-card-text class="py-1">Test sanasi: {{ e.date }}</v-card-text>
                  <v-card-text class="py-1">Berilgan muhlati: {{ e.time }} min</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script setup>
import axios from "../../axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const btnItem = {
  created: 'Boshlash',
  start: 'Davom Ettirish',
  finish: "Natijani Ko'rish"
}
const exams = ref([]);
const midterm = ref([]);

const init = async () => {
    const today = new Date();
    const dateParts = [
        today.getFullYear().toString().substring(0),
        (today.getMonth() + 1).toString().padStart(2, '0'),
        today.getDate().toString().padStart(2, '0'),
    ];
    const dateString = new URLSearchParams({date: dateParts.join('-')}).toString();
    const result = await Promise.all([axios.get(`/exam?${dateString}`),axios.get(`/midterm?${dateString}`)]);
    exams.value = result[0].data;
    midterm.value = result[1].data
};
const start = async ({count, result, test }) => {
  if(result.status === 'created'){
    await axios.post(`/test/start/${test._id}`, { count, result: result._id });
  }
  router.push(`/test/${result._id}`);
};
const startMidterm = async (midterm, count) => {
  const { data } = await axios.post(`/midterm/start/${midterm}`, { count });
  router.push(`/midterm/${data._id}`);
};

init();
</script>