<template>
  <v-card>
    <v-card-title class="text-h6 d-flex justify-space-between align-center">
      Yuborilgan vazifalar
      <v-spacer></v-spacer>
      <v-btn size="30" class="mr-2" color="primary" @click="$emit('closeView')">
        <v-icon size="small">mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        
      </v-row>
    </v-card-text>
    <v-card-text class="px-2">
      <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="item, ind in items" :key="ind">
          <v-expansion-panel-title v-slot="{ open }">
            <v-row no-gutters align="center" justify="space-between" class="pr-3">
              <v-col cols="6" class="d-flex justify-start py-0">
                {{ ind + 1 }}. {{ item.student?.name }} ({{ item.group?.name }}-guruh)
              </v-col>
              <v-col cols="6" sm="3" class="py-0">
                <v-select
                  v-if="!item.rate"
                  :items="[0, 1, 2, 3, 4, 5]"
                  @update:modelValue="sendRate($event, item, ind)"
                  hide-details label="Bahosi"
                  density="compact"
                  flat color="primary"
                  variant="outlined"
                ></v-select>
                <v-chip v-else label color="primary">
                  Baho: {{ item.rate }}
                </v-chip>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12">
                <span class="text-body-2">Yuborilgan vaqti: {{ item.date }}</span> <br>
                <span class="text-body-2">Vazifa izohi: {{ item.description }}</span> <br>
                <template v-if="item?.rate_description">
                    <v-divider></v-divider>
                    <span class="text-body-2">Baho izohi: {{ item.rate_description }}</span>
                </template>
                <v-divider></v-divider>
                <v-list density="compact" class="py-0">
                  <v-list-item v-for="(file, j) in item.files" :key="file" class="px-0">
                    <v-list-item-title class="text-body-2">
                      {{ j + 1 }}. {{ file }}
                    </v-list-item-title>
                    <template v-slot:append>
                      <a :href="`/files/${file}`" target="_blank" download="true">
                        <v-btn color="primary" size="30" variant="flat" class="ml-3">
                          <v-icon>mdi-download</v-icon>
                        </v-btn>
                      </a>
                    </template>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-card-text>
      <v-pagination density="compact" :length="pageCount"></v-pagination>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import axios from "../axios";

const props = defineProps({
  homeworkid: {
    type: String,
  },
});

const homeworkHeaders = [
  { title: "Talaba", key: "name", align: "start", sortable: false },
  { title: "Guruhi", key: "group", sortable: false },
  { title: "Yuborilgan vaqti", key: "date" },
  { title: "Baho", key: "rate" },
];

const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

const itemsPerPage = ref(10);
const page = ref(1);
const loading = ref(true);
const totalItems = ref(0);

const items = ref([]);
const expd = ref([]);
const search = ref("");

const loadItems = async () => {
  loading.value = true
  const { data } = await axios.get(`/homework/studenttasks/${props.homeworkid}`, {
    params: {
      page: page.value,
      limit: itemsPerPage.value,
      search: search.value,
    },
  })
  items.value = data.result
  totalItems.value = data.count
  loading.value = false
  console.log(data);
};

const sendRate = async (rate, item, index) => {
  if (confirm(`Siz talaba ${item.student}ga ${rate} baho qo'yyapsiz!`)) {
    let rate_description;
    do {
      rate_description = prompt("Bahoga qo'yilgan izohni yozing");
    } while (!rate_description.trim());
    const newItem = { rate, rate_description };
    Object.assign(items.value[index], newItem);

    await axios.put(`/homework/edit/${item._id}?student=true`, newItem);
  }
};

loadItems()
</script>

<style>
@media screen and (max-width: 600px) {
  .resp-table .v-data-table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .resp-table .v-data-table td {
    border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
    display: block;
    text-align: right;
    line-height: 48px;
  }

  .resp-table .v-data-table td::before {
    content: attr(data-label);
    float: left;
    font-weight: normal;
  }

  .resp-table .v-data-table td:last-child {
    border-bottom: 0;
  }

  .resp-table .v-data-table tr:not(:first-child) > td:first-child {
    border-top: medium solid rgba(var(--v-border-color), var(--v-border-opacity));
  }
}  
</style>