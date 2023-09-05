<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="7">
        <v-card class="mb-3" color="surface" v-for="(q, i) in questions" :key="i" >
          <v-card-text class="pb-0">{{ i + 1 }}. {{ q.text }}</v-card-text>
          <v-card-text class="pt-1">
            <v-radio-group color="primary" density="comfortable" v-model="q.selected"
              @change="update(i, q.selected)" hide-details >
              <v-radio v-for="(v, j) in q.variants"
                :key="j" :class="v.value==1?'green-color':'red-color'"
                :label="v.text" :value="v._id" />
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" class="d-flex justify-end align-start">
        <v-card width="100%" color="surface" class="sticky">
          <v-card-title>Natijalar</v-card-title>
          <v-card-text class="text-red">&lt;&lt; Testlarni belgilagandan keyin "Yakunlash" ni bosing!!! &gt;&gt;</v-card-text>
          <v-card-text class="py-1">Test nomi: {{ test?.test.name }}</v-card-text>
          <v-card-text class="py-1">Talaba: {{ test?.student?.name }}</v-card-text>
          <v-card-text class="py-1">To'gri: {{ test?.rate }} </v-card-text>
          <v-card-text class="py-1">Foiz: {{ parseFloat((test?.rate * 100) / questions.length).toFixed(1) }} %</v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="flat" @click="prev()">Ortga Qaytish</v-btn>
            <v-spacer />
            <v-btn color="primary" variant="flat" @click="finish()">Yakunlash</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import axios from "../../axios";

const questions = ref([]);
const status = ref("");
const test = ref(null);
const route = useRoute();
const router = useRouter();
const testid = route.params.id;

function prev(){
  window.history.back()
}

const init = async () => {
  const { data } = await axios.get(`/test/get/${testid}`);
  // console.log(data);
  test.value = data;
  questions.value = data.questions;
};

const update = async (n, v) => {
  await axios.put(`/test/upd/${testid}/${n}/${v}`);
};

const finish = async () => {
  await axios.put(`/test/finish/${testid}?secretcode=1234`);
  init()
};

init();
</script>

<style>
.sticky {
  position: sticky;
  top: 20px;
}
.green-color{
  color: green;
}
.red-color{
  color: red;
}
</style>