<template>
  <v-card>
    <v-card-title
      class="text-h6 d-flex justify-space-between align-center"
    >
      <v-sheet
        elevation="0"
        color="surface"
        width="100%"
        class="pa-2 py-4"
        rounded
      >
        <v-row justify="space-between">
          <v-col class="py-1" cols="10" sm="4">
            <v-select
              v-model="group"
              label="Guruhi"
              density="compact"
              hide-details
              @update:modelValue="init"
              :items="props.groups"
              color="primary"
              item-title="name"
              item-value="_id"
              variant="outlined"
            />
          </v-col>
          <v-col class="py-1 d-flex justify-end align-center" cols="2" sm="4" md="3">
            <v-btn size="30" color="primary" @click="$emit('close-view')">
              <v-icon size="small">mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card-title>
    <v-card-text class="px-2">
      <div class="responsive-datatable">
        <v-data-table
          no-data-text="Hech narsa topilmadi"
          items-per-page-text
          items-per-page="-1"
          :headers="studentheaders"
          :search="search"
          :items="users"
        >
          <template #item.name="{ index, item }">
            <td data-label="Ism familiyasi">
              {{ index + 1 }}. {{ item.raw.name }}
            </td>
          </template>
          <template #bottom></template>
          <template #item.rate="{ item }">
            <td data-label="Bahosi">
              {{ item.raw.rates?.rate || 0 }}/{{
                item.raw.rates?.questions || 0
              }}
            </td>
          </template>
          <template #item.start_time="{ item }">
            <td data-label="Boshlangan">
              {{
                item.raw.rates?.start_time
                  ? new Date(
                      parseInt(item.raw.rates.start_time)
                    ).toLocaleString()
                  : "00.00.0000, 00:00:00"
              }}
            </td>
          </template>
          <template #item.end_time="{ item }">
            <td data-label="Tugatgan">
              {{
                item.raw.rates?.start_time
                  ? new Date(
                      parseInt(item.raw.rates.start_time)
                    ).toLocaleString()
                  : "00.00.0000, 00:00:00"
              }}
            </td>
          </template>
          <template #item.actions="{ index, item }">
            <td data-label="Boshqarish">
              <v-btn
                variant="flat"
                @click="possible(item.raw.rates._id, index, item.raw.name)"
                color="primary"
                :disabled="!item.raw.rates"
                >Imkoniyat berish</v-btn
              >
            </td>
          </template>
        </v-data-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, defineProps } from "vue";
import axios from "../axios";

const props = defineProps({
  groups: {
    type: Array,
  },
  testid: {
    type: String,
  },
  testname: {
    type: String,
  },
});

const studentheaders = [
  { title: "Ism familiyasi", key: "name" },
  { title: "Bahosi", key: "rate" },
  { title: "Boshlangan", key: "start_time" },
  { title: "Tugatgan", key: "end_time" },
  { title: "Boshqarish", key: "actions" },
];

const users = ref([]);
const group = ref(null);
const search = ref("");

const init = async () => {
  const { data } = await axios.get(
    `/user/student/repossible/${group.value}/${props.testid}`
  );
  users.value = data;
};

const possible = async (id, index, student) => {
  const { data } = await axios.delete(`/test/result/${id}?writeaction=${student}&testname=${props.testname}`);
  if (data) users.value[index].rates = null;
};
</script>