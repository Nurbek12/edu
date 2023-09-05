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
          <div class="d-flex justify-center">{{ store.getters.user?.name || 'Bosh Sahifa' }}</div>
        </v-sheet>
      </v-col>
    </v-row>
        
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card height="100%">
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/exam.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/dean/access" block variant="flat" color="primary">Imtihonlar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/administration.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/admin/table" block variant="flat" color="primary">Dars Jadvali</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/attendance.jpg"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/dean/attendance" block variant="flat" color="primary">Davomat</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-center">
            <v-img src="/img/graduated.png"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/dean/students" block variant="flat" color="primary">Talabalar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "../../axios";
import { useStore } from 'vuex'

const store = useStore()
const info = ref({
  students: 0,
  groups: 0,
  tests: 0,
  inspectors: 0,
});

const carts = [
  { title: 'Guruhlar', color: 'green accent-3', item: 'groups', icon: 'mdi-account-box-multiple' },
  { title: 'Talabalar', color: 'red accent-3', item: 'students', icon: 'mdi-account-group' },
  { title: 'Nazoratchilar', color: 'blue accent-3', item: 'inspectors', icon: 'mdi-police-badge' },
  { title: 'Testlar', color: 'amber darken-3', item: 'tests', icon: 'mdi-clipboard-text-multiple' },
];
</script>