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
          <div class="d-flex justify-center">FAN MA'RUZALARI</div>
        </v-sheet>
      </v-col>
      
      <v-col cols="12">
        <v-timeline density="compact" side="end">
          <v-timeline-item v-for="item in items" :key="item._id" width="100%" dot-color="primary" size="small">
            <v-row>
              <v-col cols="12" class="py-1">
                <!-- <v-chip label variant="elevated" color="primary" class="mb-2 mr-1" size="large">
                  <v-icon class="mr-2" size="small">mdi-clock-outline</v-icon>{{ item.date }}
                </v-chip> -->
                <v-chip label variant="elevated" color="primary" class="mb-2 mr-1" size="large">
                  <v-icon class="mr-2" size="small">mdi-account-tie-woman</v-icon>{{ item.teacher?.name }}
                </v-chip>
                <v-chip label variant="elevated" color="primary" class="mb-2 mr-1" size="large">
                  <v-icon class="mr-2" size="small">mdi-home</v-icon>{{ item.room }}
                </v-chip>
              </v-col>
              <v-col cols="12" class="py-1">
                <v-expansion-panels variant="accordion">
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      {{ item.subject }}: {{ item.name }}
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="resources">
                      <v-list density="compact">
                        <v-list-item v-for="file, j in item.files"
                          :key="file" class="px-2">
                          <v-list-item-title class="text-body-2">{{j+1}}. {{ file }}</v-list-item-title>
                          <template v-slot:append>
                              <a :href="`/files/${file}`" target="_blank" download="true">
                                <v-btn color="primary" size="30" variant="flat" class="ml-3">
                                  <v-icon>mdi-download</v-icon>
                                </v-btn>
                              </a>
                          </template>
                        </v-list-item>
                      </v-list>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
  <FooterPage @getDate="init" />
</template>

<script setup>
import { ref } from "vue";
import axios from "../../axios";
import { useStore } from "vuex";
import FooterPage from '../../components/FooterPage.vue'

const store = useStore();
const items = ref([]);
const init = async (distance) => {
  const { data } = await axios.get(`/resource?group=${store.getters.user?.group}&${distance||''}`);
  items.value = data;
};

init();
</script>

<style>
.resources .v-expansion-panel-text__wrapper{
  padding: 8px !important;
}
</style>