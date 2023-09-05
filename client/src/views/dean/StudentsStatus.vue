<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface"
          width="100%" class="pa-2 py-4" rounded>
          <v-row justify="start" align="center">
            <v-col class="py-1" cols="12" sm="4">
              <v-select
                v-model="editedItem.group"
                label="Guruh"
                @update:modelValue="getUsers"
                hide-details
                density="compact"
                :items="groups"
                color="primary"
                item-title="name"
                item-value="_id"
                variant="outlined"
              />
            </v-col>
            <v-col class="py-1" cols="12" sm="4">
              <v-text-field
                label="Qidirish"
                v-model="search"
                variant="outlined"
                color="primary"
                density="compact"
                hide-details
              />
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-sheet elevation="1"
          color="surface" width="100%"
          class="pa-2" rounded>
          <div class="responsive-datatable">
            <v-data-table items-per-page="-1" items-per-page-text no-data-text="Hech narsa topilmadi" 
                :headers="headers" :search="search" :items="items1">
              <template v-slot:item.actions="{ item }">
                <td data-label="Boshqarish">
                  <div class="d-flex justify-end">
                    <v-btn variant="flat" color="primary"
                      @click="editItem(item.raw, 'chetlashtirilgan')">
                      <v-icon>mdi-hand-back-left</v-icon> Chetlatish
                    </v-btn>
                  </div>
                </td>
              </template>
              <template #bottom></template>
              <template #item.name="{ index, item }">
                <td data-label="Ism familiyasi">{{ index + 1 }}. {{ item.raw.name }}</td>
              </template>
              <template #item.login="{ item }">
                <td data-label="Login">{{ item.raw.login }}</td>
              </template>
              <template #item.phone="{ item }">
                <td data-label="Telefoni">{{ item.raw.phone }}</td>
              </template>
              <template #item.birthdate="{ item }">
                <td data-label="Tugilgan sanasi">{{ item.raw.birthdate }}</td>
              </template>
              <template #item.status="{ item }">
                <td data-label="Holati">
                  <v-chip label :color="{aktiv: 'blue', chetlashtirilgan: 'red'}[item.raw.status]">{{ item.raw.status }}</v-chip>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-sheet elevation="1"
          color="surface" width="100%"
          class="pa-2" rounded>
          <div class="responsive-datatable">
            <v-data-table items-per-page="-1" items-per-page-text no-data-text="Hech narsa topilmadi" 
                :headers="headers" :search="search" :items="items2" item-value="_id" show-expand v-model:expanded="expanded">
              <template #bottom></template>
              <template v-slot:item.actions="{ item }">
                <td data-label="Boshqarish">
                  <div class="d-flex justify-end">
                    <v-btn variant="flat" color="primary"
                      @click="editItem1(item.raw, 'aktiv')">
                      <v-icon>mdi-restore-alert</v-icon> Qaytarish
                    </v-btn>
                  </div>
                </td>
              </template>

              <template #item.name="{ index, item }">
                <td data-label="Ism familiyasi">{{index + 1}}. {{ item.raw.name }}</td>
              </template>
              <template #item.login="{ item }">
                <td data-label="Login">{{ item.raw.login }}</td>
              </template>
              <template #item.password="{ item }">
                <td data-label="Paroli">{{ item.raw.password }}</td>
              </template>
              <template #item.phone="{ item }">
                <td data-label="Telefoni">{{ item.raw.phone }}</td>
              </template>
              <template #item.birthdate="{ item }">
                <td data-label="Tugilgan sanasi">{{ item.raw.birthdate }}</td>
              </template>
              <template #item.status="{ item }">
                <td data-label="Holati">
                  <v-chip label :color="{aktiv: 'blue', chetlashtirilgan: 'red'}[item.raw.status]">{{ item.raw.status }}</v-chip>
                </td>
              </template>
              <template v-slot:expanded-row="{ columns, item }">
                <tr>
                    <td :colspan="columns.length">
                      Chetlatish Sababi: {{ item.raw.reason }}
                    </td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="550px">
      <v-card>
        <v-card-title class="mt-2 ml-2 mb-0">
          <span class="text-h5">{{ formtitle }}</span>
        </v-card-title>

        <v-card-text class="px-2 pt-0">
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-textarea v-model="editedItem.reason"
                    label="Chetlatish sababi"
                    hide-details :rules="rules"
                    color="primary"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12">
                  <v-btn variant="flat"
                    color="primary" block
                    @click="validate" height="45" >
                    Saqlash
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

const rules = [(v) => !!v || "Required"];
const headers = [
  { title: "Ism familiyasi", key: "name" },
  { title: "Login", key: "login" },
  { title: "Telefoni", key: "phone" },
  { title: "Tugilgan sanasi", key: "birthdate" },
  { title: "Holati", key: "status" },
  { title: "Boshqarish", align: "start", key: "actions", sortable: false },
];

const formtitle = computed(() => editedItem.value.status !== 'aktiv' ? 'Talabani Chetlatish' : 'Talabani Qaytarish')

const search = ref("");
const items1 = ref([]);
const items2 = ref([]);
const dialog = ref(false);
const form = ref(null);
const editedIndex = ref(-1);
const editedId = ref(-1);
const groups = ref([]);
const editedItem = ref({
  reason: '',
  status: 'chetlashtirilgan',
  group: null,
});
const defaultItem = {
  reason: '',
  status: 'chetlashtirilgan',
};

const expanded = ref([]);

watch(dialog, (v) => v || close());

const initialize = async () => {
    const { data } = await axios.get('/group')
    groups.value = data
  },
  validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
  },
  editItem = (item, status) => {
    editedIndex.value = items1.value.indexOf(item);
    editedId.value = item._id;
    editedItem.value = Object.assign({}, {...item, status});
    dialog.value = true;
  },
  editItem1 = (item, status) => {
    editedIndex.value = items2.value.indexOf(item);
    editedId.value = item._id;
    editedItem.value = Object.assign({}, {...item, status});
    dialog.value = true;
  },
  close = () => {
    dialog.value = false;
    nextTick(() => {
      editedItem.value = Object.assign({}, defaultItem);
      editedId.value = -1;
      editedIndex.value = -1;
      form.value?.reset()
    });
  },
  save = async () => {
    const { data } = await axios.put(`/user/${editedId.value}`, editedItem.value);
    
    if(editedItem.value.status === 'aktiv'){
        items2.value.splice(editedIndex.value, 1)
        items1.value.push(data)
    }else{
        items1.value.splice(editedIndex.value, 1)
        items2.value.push(data)
    }
    
    close()
  },
  
  getUsers =  async () => {
    const { data } = await axios.get(`/user/student?group=${editedItem.value.group}`)
    items1.value = data?.filter(i => i.status === 'aktiv')
    items2.value = data?.filter(i => i.status !== 'aktiv')
  };

initialize();
</script>