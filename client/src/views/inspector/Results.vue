<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-sheet
          elevation="1"
          color="surface"
          width="100%"
          class="pa-2"
          rounded
        >
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-select
                v-model="accessexam"
                label="Imtihon" density="comfortable"
                hide-details @update:modelValue="getResults"
                :items="tests"
                color="primary"
                item-title="name"
                return-object
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="accessgroup"
                label="Guruh" :disabled="!accessexam"
                @update:modelValue="getResults"
                hide-details density="comfortable"
                :items="accessexam?.groups||[]"
                color="primary"
                item-title="name"
                item-value="_id"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                label="Qidirish"
                v-model="search"
                variant="outlined"
                color="primary"
                density="compact"
                hide-details
              />
            </v-col>
            <v-col>
              <v-btn block color="primary" height="42" @click="dialog=true" variant="flat">Yuklab olish</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="8">
        <v-sheet elevation="1" color="surface" width="100%" class="pa-2" rounded >
          <div class="responsive-datatable">
            <v-data-table items-per-page-text :headers="headers" :search="search" :items="items">
              <!-- <template v-slot:item.no="{ index }"> 
                <td data-label="T/r">{{ index }}.</td>
              </template> -->
              <template #item.student.name="{ item }">
                <td data-label="Talaba">{{ item.raw.student?.name }}</td>
              </template>
              <template #item.rate="{ item }">
                <td data-label="Bahosi">
                  {{ item.raw.rate }} / {{ item.raw.questions }}
                </td>
              </template>
              <template #item.percent="{ item }">
                <td data-label="Foizi"> {{ parseFloat((item.raw.rate * 100) / item.raw.questions).toFixed(1) }} %
                </td>
              </template>
              <template #item.view="{ item }">
                <td data-label="Ko'rish">
                  <v-btn variant="flat" size="30" color="primary" :to="`/tests/${item.raw._id}`" >
                    <v-icon>mdi-eye-arrow-right</v-icon>
                  </v-btn>
                </td>
              </template>
              <template v-slot:no-data>
                <div>Hech narsa topilmadi</div>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="550px">
      <v-card>
        <v-card-text class="px-2 pt-0">
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-card-title>Ma'lumotlarni yuklab olish</v-card-title>
                <v-col cols="12">
                  <v-select
                    v-model="query.exam" :items="tests"
                    label="Test bo'yicha" clearable clear-icon="mdi-close"
                    hide-details item-title="name"
                    color="primary" item-value="_id"
                    variant="outlined" />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="query.group" clearable clear-icon="mdi-close"
                    label="Guruh bo'yicha" :items="groups"
                    hide-details item-title="name"
                    color="primary" item-value="_id"
                    variant="outlined" />
                </v-col>
                <v-col cols="12">
                  <v-btn variant="flat" color="primary" block @click="download" height="45">
                    Yuklab olish
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import axios from "../../axios";
import { useStore } from "vuex";

const store = useStore();
const groupby = [{ key: "group.name", order: "asc" }];
const headers = [
  { title: "Talaba", key: "student.name" },
  { title: "Bahosi", key: "rate" },
  { title: "Foizi", key: "percent" },
  { title: "Ko'rish", key: "view" },
];

const search = ref("");
const dialog = ref(false);
const items = ref([]);
const tests = ref([]);
const groups = ref([]);
const accessexam = ref(null);
const accessgroup = ref(null);
const query = ref({
  group: null,
  exam: null,
});
const downloadexcel = ref(false);

const initialize = async () => {
  const result = await Promise.all([axios.get('/exam/list'),axios.get('/group')]);
  // tests.value = result[1].data.tests
  tests.value = result[0].data
  groups.value = result[1].data
};

const getResults = async () => {
  if(!accessgroup.value) return
  const qry = new URLSearchParams({ group: accessgroup.value, exam: accessexam.value._id }).toString()
  const { data } = await axios.get(`/test/result?${qry}`)
  items.value = data
}

async function download() {
  for (const key in query.value) {
    if (query.value[key] === null || query.value[key] === '') {
      delete query.value[key]
    }
  }
  const qry = new URLSearchParams(query.value).toString()
  downloadexcel.value = true;
  await axios({
    method: "get",
    url: "/test/download?"+qry,
    responseType: "blob",
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "result.xlsx");
    document.body.appendChild(link);
    link.click();
  });
  downloadexcel.value = false;
}

const close = () => {
  dialog.value = false;
  nextTick(() => {
    Object.assign(query.value, {
      group: null,
      test: null,
    })
  });
};

watch(dialog, (v) => v || close());

initialize();
</script>