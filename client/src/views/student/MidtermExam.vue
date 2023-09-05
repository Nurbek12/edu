<template>
  <v-container fluid>
    <v-row v-if="status === 'start'">
      <v-col cols="12" md="7">
        <v-card
          class="mb-3"
          color="surface"
          v-for="(q, i) in questions"
          :key="i"
        >
          <v-card-text class="pb-0">{{ i + 1 }}. {{ q.text }}</v-card-text>
          <v-card-text class="pt-1">
            <v-radio-group
              color="primary"
              v-model="q.selected"
              @change="update(i, q.selected)"
              hide-details
            >
              <v-radio
                v-for="(v, j) in q.variants"
                :key="j"
                :label="v.text"
                :value="v._id"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" class="d-flex justify-end align-start">
        <v-card width="100%" color="surface" class="sticky">
          <v-card-title>Javoblar</v-card-title>
          <v-card-text class="mt-4">
            <div class="d-flex" style="flex-wrap: wrap; gap: 10px">
              <v-chip
                size="large"
                v-for="(q, i) in questions"
                :key="i"
                :color="q.selected ? 'green' : 'white'"
                variant="elevated"
              >
                {{ i + 1 }}
              </v-chip>
            </div>
          </v-card-text>
          <v-card-actions class="pl-5">
            <span>{{ time }}</span>
            <v-spacer />
            <v-btn color="primary" variant="flat" @click="finish">Yakunlash</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="status === 'finish'">
      <v-col cols="12" md="7">
        <v-card
          class="mb-3"
          color="surface"
          v-for="(q, i) in questions"
          :key="i"
        >
          <v-card-text class="pb-0">{{ i + 1 }}. {{ q.text }}</v-card-text>
          <v-card-text class="pt-1">
            <v-sheet
              v-for="(v, j) in q.variants"
              width="100%"
              rounded
              class="my-1 py-1 px-2"
              :color="
                q.selected === v._id ? (v.value ? 'green' : 'red') : 'gray'
              "
              >{{ v.text }}</v-sheet
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" class="d-flex justify-end align-start">
        <v-card width="100%" color="surface" class="sticky">
          <v-card-title>Natijalar</v-card-title>
          <v-card-text class="py-1"
            >Test nomi: {{ test.midterm?.name }}</v-card-text
          >
          <v-card-text class="py-1"
            >Talaba: {{ test.student?.name }}</v-card-text
          >
          <v-card-text class="py-1"
            >Boshlandi: {{ new Date(test.start_time).toLocaleString() }}</v-card-text
          >
          <v-card-text class="py-1"
            >Tugadi: {{ new Date(test.end_time).toLocaleString() }}
          </v-card-text>
          <v-card-text class="py-1">To'gri: {{ test.rate }} </v-card-text>
          <v-card-text class="py-1"
            >Foiz:
            {{ parseFloat((test.rate * 100) / questions.length).toFixed(1) }}
            %</v-card-text
          >
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" variant="flat" @click="prev()">Ortga qaytish</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2" rounded>
          <div class="d-flex justify-center text-red">Ushbu Oraliq Testi Topilmadi!</div>
          <div class="d-flex justify-center mt-3">
            <v-btn variant="flat" color="primary" @click="prev">Ortga Qaytish</v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import axios from "../../axios";

const questions = ref([]);
const status = ref("");
const test = ref(null);
const route = useRoute();
const router = useRouter();
const testid = route.params.id;
const time = ref("00:00");

function start() {
  let t = Math.floor(
    test.value.midterm.time * 60 -
      (Date.now() - parseInt(test.value.start_time)) / 1000
  );
  function detonatorTimer(t) {
    if (t > 0) {
      t--;
      let m = Math.floor(t / 60);
      let s = t % 60;
      time.value = `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
      setTimeout(detonatorTimer, 1000, t);
    } else if (t === 0) {
      finish()
    }
  }
  detonatorTimer(t)
}

function prev(){
  window.history.back()
}


const init = async () => {
  const { data } = await axios.get(`/midterm/get/${testid}`);
  if(!data) return
  test.value = data;
  if(data.status === 'start'){
    start();
  }
  status.value = data.status;
  questions.value = data.questions;
};

const update = async (n, v) => {
  if(time.value === '00:00') return
  await axios.put(`/test/upd/${testid}/${n}/${v}`);
};

const finish = async () => {
  await axios.put(`/test/finish/${testid}`);
  init();
  status.value = "finish";
};

init();
</script>

<style>
.sticky {
  position: sticky;
  top: 20px;
}
</style>