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
          <v-timeline-item v-for="(e, i) in exams" :key="i"  size="small" dot-color="primary" width="100%">
            <v-row align="center">
              <v-col cols="12" :sm="e.result?.status === 'finish' ? 7 : 12">
                <v-card width="100%" elevation="2" rounded class="pt-4">
                  <v-card-title class="py-1">Imtihon testi</v-card-title>
                  <v-card-text class="py-1">Test bazasi: {{ e.test?.name }}</v-card-text>
                  <v-card-text class="py-1">Test sanasi: {{ e.date }}</v-card-text>
                  <v-card-text class="py-1">Savollar soni: {{ e.count }}</v-card-text>
                  <v-card-text class="py-1">Berilgan muhlati: {{ e.time }} min</v-card-text>

                  <v-card-actions class="mt-3">
                    <v-spacer></v-spacer>
                    <v-btn variant="flat" color="primary" :disabled="!e.result" @click="start(e)">{{ btnItem[e.result?.status] || 'Boshlash' }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col v-if="e.result?.status === 'finish'" cols="12" sm="5">
                <v-card color="surface" width="100%">
                  <v-card-title>Natijalar</v-card-title>
                  <v-card-text class="py-1">Boshlandi: {{ new Date(e.result.start_time).toLocaleString() }}</v-card-text>
                  <v-card-text class="py-1">Tugadi: {{ new Date(e.result.end_time).toLocaleString() }}</v-card-text>
                  <v-card-text class="py-1">To'gri: {{ e.result.rate }} / {{ e.count }}</v-card-text>
                  <v-card-text class="pt-1">Foiz: {{ parseFloat((e.result.rate * 100) / e.count).toFixed(1) }} %</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-timeline-item>
          <v-timeline-item v-for="(e, i) in midterm" :key="i" size="small" dot-color="primary" width="100%">
            <v-row align="center">
              <v-col cols="12" :sm="e.result ? 7 : 12">
                <v-card width="100%" elevation="2" rounded class="pt-4">
                  <v-card-title class="py-1">Oraliq testi</v-card-title>
                  <v-card-text class="py-1">Test nomi: {{ e.name }}</v-card-text>
                  <v-card-text class="py-1">Testlar soni: {{ e.count }}</v-card-text>
                  <v-card-text class="py-1">Test sanasi: {{ e.date }}</v-card-text>
                  <v-card-text class="py-1">Berilgan muhlati: {{ e.time }} min</v-card-text>

                  <v-card-actions class="mt-3">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" variant="flat" v-if="e.result" :to="`/midterms/${e.result._id}`">Natijani Ko'rish</v-btn>
                    <v-btn color="primary" variant="flat" v-else @click="startMidterm(e._id, e.count, e.subject, e.time)">{{ btnItem[e.result?.status] || 'Boshlash' }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col v-if="e.result" cols="12" sm="5">
                <v-card color="surface" width="100%">
                  <v-card-title>Natijalar</v-card-title>
                  <v-card-text class="py-1">Boshlandi: {{ new Date(e.result.start_time).toLocaleString() }}</v-card-text>
                  <v-card-text class="py-1">Tugadi: {{ new Date(e.result.end_time).toLocaleString() }}</v-card-text>
                  <v-card-text class="py-1">To'gri: {{ e.result.rate }} / {{ e.count }}</v-card-text>
                  <v-card-text class="pt-1">Foiz: {{ parseFloat((e.result.rate * 100) / e.count).toFixed(1)}} %</v-card-text>
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
  const result = await Promise.all([axios.get(`/exam/my`),axios.get(`/midterm/my`)]);
  exams.value = result[0].data;
  midterm.value = result[1].data
};
const start = async ({count, result, test, time }) => {
  if(result.status === 'created'){
    await axios.post(`/test/start/${test._id}`, { count, result: result._id, time });
  }
  router.push(`/tests/${result._id}`);
};
const startMidterm = async (midterm, count, subject, time) => {
  const { data } = await axios.post(`/midterm/start/${midterm}`, { count, subject, time });
  router.push(`/midterms/${data._id}`);
};

init();
</script>