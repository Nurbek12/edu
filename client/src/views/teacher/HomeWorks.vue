<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet
          elevation="1"
          color="surface"
          width="100%"
          class="pa-2 py-4"
          rounded
        >
          <v-row justify="space-between" align="center">
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
            <v-col class="py-1" cols="12" sm="4" md="3">
              <v-btn
                block height="42"
                color="primary"
                @click="dialog = true"
                variant="flat"
                >Topshiriq yaratish</v-btn
              >
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-sheet
          elevation="1"
          color="surface"
          width="100%"
          class="pa-2"
          rounded
        >
          <div class="responsive-datatable">
            <v-data-table no-data-text="Hech narsa topilmadi" items-per-page-text :headers="headers" :search="search" :items="items">
              <template #item.name="{ index, item }">
                <td data-label="Topshiriq nomi">{{ index + 1 }}. {{ item.raw.name }}</td>
              </template>
              <template #item.subject="{ item }">
                <td data-label="Fan nomi">{{ item.raw.subject }}</td>
              </template>
              <template #item.group="{ item }">
                <td data-label="Guruhlar">
                  <div style="display: flex; gap: 5px;">
                    <v-chip label color="primary" size="small" v-for="gr, i in getGroupsName(item.raw.groups)" :key="i">
                      {{ gr }}
                    </v-chip>
                  </div>
                </td>
              </template>
              <template #item.date="{ item }">
                <td data-label="Muxlati">{{ item.raw.date }}</td>
              </template>
              <template #item.description="{ item }">
                <td data-label="Izohi">{{ item.raw.description }}</td>
              </template>
              <template v-slot:item.actions="{ item }">
                <td data-label="Boshqarish">
                  <v-spacer></v-spacer>
                  <div class="d-flex justify-end">
                    <v-btn variant="flat" class="ml-1"
                      size="30" color="primary"
                      @click="editItem(item.raw)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn variant="flat" class="ml-1"
                      size="30" color="primary"
                      @click="deleteItem(item.raw)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn variant="flat" class="ml-1"
                      size="30" color="primary"
                      @click="dialogView=true, homeworkid=item.raw._id"
                    >
                      <v-icon>mdi-briefcase-eye</v-icon>
                    </v-btn>
                  </div>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="550px">
      <v-card>
        <v-card-title class="mt-2 ml-2 mb-0">
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text class="px-2 pt-0">
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Topshiriq nomi"
                    hide-details
                    color="primary"
                    :rules="rules"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-select
                        v-model="editedItem.groups"
                        label="Guruhlar"
                        :rules="rules"
                        hide-details
                        multiple
                        :items="groups"
                        color="primary"
                        item-title="name"
                        item-value="_id"
                        variant="outlined"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                        v-model="editedItem.subject"
                        label="Fan nomi"
                        :rules="rules"
                        hide-details
                        :items="subjects"
                        color="primary"
                        item-title="name"
                        item-value="name"
                        variant="outlined"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field type="date"
                    v-model="editedItem.date"
                    label="Muhlati"
                    hide-details
                    color="primary"
                    :rules="rules"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" v-if="editedIndex===-1">
                    <v-file-input hide-details variant="outlined" color="primary" v-model="files" :prepend-icon="null" label="Fayllar" multiple :show-size="true">
                        <template v-slot:selection="{ fileNames }">
                            <template v-for="fileName in fileNames" :key="fileName">
                                <v-chip size="small" label color="primary" class="me-2">
                                    {{ fileName }}
                                </v-chip>
                            </template>
                        </template>
                    </v-file-input>
                </v-col>
                <template v-else>
                  <v-col cols="12" class="px-0 py-0">
                    <v-table density="compact">
                      <thead>
                        <tr>
                          <th class="text-left">Fayl Nomi</th>
                          <th class="text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="file, i in editedItem.files" :key="file">
                          <td>
                            <span class="text-caption gray">{{i+1}}. {{ file }}</span>
                          </td>
                          <td>
                            <a :href="`/files/${file}`" download target="_blank">
                              <v-btn color="primary" variant="flat" size="25" class="mr-1">
                                <v-icon size="small">mdi-download</v-icon>
                              </v-btn>
                            </a>
                            <v-btn color="primary" variant="flat" size="25" @click="removeFile(file, i)">
                              <v-icon size="small">mdi-delete</v-icon>
                            </v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-col>
                  <v-col cols="12">
                    <input type="file" hidden id="file-input" @change="addFile">
                    <v-btn variant="flat" @click="fileInputClick" color="primary" block height="45">
                      Fayl qo'shish
                    </v-btn>
                  </v-col>
                </template>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.description"
                    label="Topshiriq izohi"
                    hide-details
                    color="primary"
                    :rules="rules"
                    variant="outlined" />
                </v-col>
                <v-col cols="12" class="pt-0">
                  <v-btn variant="flat" color="primary" block @click="validate" height="45">
                    Saqlash
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogView" persistent>
      <HomeWorkTable @closeView="dialogView=false" :homeworkid="homeworkid" />
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import { useStore } from "vuex";
import axios from "../../axios";
import HomeWorkTable from "../../components/HomeWorkTable.vue";

const headers = [
  { title: "Topshiriq nomi", key: "name" },
  { title: "Fani", key: "subject", sortable: false },
  { title: "Guruhlar", key: "group", sortable: false },
  { title: "Muhlati", key: "date" },
  { title: "Izohi", key: "description", sortable: false },
  { title: "Boshqarish", key: "actions", sortable: false },
];
const rules = [(v) => !!v || "Required"];
const store = useStore()
const search = ref("");
const form = ref(null);
const items = ref([]);
const subjects = ref([]);
const groups = ref([]);

const dialog = ref(false);
const dialogView = ref(false)
const editedIndex = ref(-1);
const editedId = ref(-1);
const homeworkid = ref(null);
const editedItem = ref({
    groups: [],
    teacher: '',
    name: '',
    description: '',
    subject: null,
    date: '',
});
const files = ref([])
const defaultItem = {
    groups: [],
    teacher: '',
    name: '',
    description: '',
    subject: null,
    date: '',
};
const formTitle = computed(() =>
  editedIndex.value === -1 ? "Topshiriq Yaratish" : "Topshiriqni O'zgartirish"
);

watch(dialog, (v) => v || close());

const initialize = async () => {
    const result = await Promise.all([axios.get("/subject/access"),axios.get("/group/access"),axios.get(`/homework`)]);
    subjects.value = result[0].data;
    groups.value = result[1].data
    items.value = result[2].data
  },
  validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
  },
  editItem = (item) => {
    editedIndex.value = items.value.indexOf(item);
    editedId.value = item._id;
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
  },
  deleteItem = (item) => {
    editedIndex.value = items.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    editedId.value = item._id;
    if(confirm("Ushbu malumotni o'chirmoqchimisiz?")){
      deleteItemConfirm()
    }else{
      close()
    }
  },
  deleteItemConfirm = async () => {
    const { data } = await axios.delete(`/homework/${editedId.value}`);
    if (data) {
      items.value.splice(editedIndex.value, 1);
      close();
    }
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
    const formdata = new FormData();
    formdata.append('name', editedItem.value.name)
    formdata.append('subject', editedItem.value.subject)
    formdata.append('description', editedItem.value.description)
    formdata.append('date', editedItem.value.date)
    formdata.append('teacher', store.getters.userid)
    files.value.map((file) => formdata.append('files', file))
    editedItem.value.groups.map((group) => formdata.append('groups', group))
    if (editedIndex.value > -1) {
      const { data } = await axios.put(`/homework/edit/${editedId.value}`, editedItem.value);
      Object.assign(items.value[editedIndex.value], data);
    } else {
      const { data } = await axios.post("/homework", formdata);
      items.value.push(data);
    }
    close();
  },
  addFile = async (file) => {
    const fdata = new FormData()
    fdata.append('file', file.target.files[0])
    const { data } = await axios.put(`/homework/addfile/${editedItem.value._id}`, fdata)
    items.value[editedIndex.value].files.push(data)
    // console.log(data);
  },
  removeFile = async (file, i) => {
    if(confirm("Ushbu malumotni o'chirmoqchimisiz?")){
      await axios.put(`/resource/rmfile/${editedItem.value._id}/${file}`)
      items.value[editedIndex.value].files.splice(i, 1)
    }
  },
  
  fileInputClick = () => document.getElementById('file-input').click(),
  getGroupsName = (arr) => {
    return arr.map(gid => groups.value.find(({_id}) => _id === gid).name)
  };

initialize();
</script>