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
        <v-row justify="space-between" align="center">
          <v-col cols="12" sm="4">
            <div class="d-flex justify-center">FAN TOPSHIRIQLARI</div>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              label="Biriktirilgan fanlar Fanlar"
              v-model="subject"
              hide-details
              density="compact"
              :items="subjects"
              color="primary"
              item-title="name"
              item-value="_id"
              variant="outlined"
            />
          </v-col>
        </v-row>
        </v-sheet>
      </v-col>

      <v-col cols="12">
        <v-timeline density="compact" side="end">
          <v-timeline-item
            v-for="item, i in items"
            :key="item._id"
            width="100%"
            :dot-color="item.student_homeworks ? 'primary' : 'red'"
            size="small"
          >
            <!-- :dot-color="new Date() < new Date(item.date) ? 'primary' : 'red'" -->
            <v-row>
              <v-col cols="12" class="py-1">
                <!-- <v-chip label variant="elevated" color="primary" class="mb-2 mr-1" size="large">
                  <v-icon class="mr-2" size="small">mdi-clock-outline</v-icon>{{ item.date }}
                </v-chip> -->
                <v-chip
                  label
                  variant="elevated"
                  :color="new Date() < new Date(item.date) ? 'primary' : 'red'"
                  class="mb-2 mr-1"
                  size="large"
                >
                  <v-icon class="mr-2" size="small">mdi-clock-outline</v-icon
                  >{{ item.date }}
                </v-chip>
                <v-chip
                  label
                  variant="elevated"
                  color="primary"
                  class="mb-2 mr-1"
                  size="large"
                >
                  <v-icon class="mr-2" size="small">mdi-star-outline</v-icon
                  >{{ item.student_homeworks?.rate || 0 }} / 5
                </v-chip>
              </v-col>
              <v-col cols="12" class="py-1">
                <v-expansion-panels variant="accordion">
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      {{ item.subject }}: {{ item.name }}
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="resources">
                      <v-card color="transparent" elevation="0">
                        <v-card-text class="pb-0">
                          Topshiriq izohi: {{ item.description }}
                        </v-card-text>
                        <v-card-text class="pb-0">
                          Topshiriq muddati: {{ item.date }}
                        </v-card-text>
                        <v-card-text class="py-0">
                          <v-list density="compact">
                            <v-list-subheader
                              >Topshiriq fayllari</v-list-subheader
                            >
                            <v-list-item
                              v-for="(file, j) in item.files"
                              :key="file"
                              class="px-0"
                            >
                              <v-list-item-title class="text-body-2"
                                >{{ j + 1 }}. {{ file }}</v-list-item-title
                              >
                              <template v-slot:append>
                                <a
                                  :href="`/files/${file}`"
                                  target="_blank"
                                  download="true"
                                >
                                  <v-btn
                                    color="primary"
                                    size="30"
                                    variant="flat"
                                    class="ml-3"
                                  >
                                    <v-icon>mdi-download</v-icon>
                                  </v-btn>
                                </a>
                              </template>
                            </v-list-item>
                          </v-list>
                        </v-card-text>
                        <template v-if="item.student_homeworks">
                          <v-divider />
                          <v-card-text class="pb-0">
                            Vazifa izohi: {{ item.student_homeworks.description }} ({{ new Date(item.student_homeworks.createdAt).toLocaleString() }})
                            </v-card-text>
                          <v-card-text class="py-0">
                            <v-list density="compact">
                              <v-list-subheader
                                >Yuborilgan fayllar</v-list-subheader
                              >
                              <v-list-item
                                v-for="(file, j) in item.student_homeworks.files"
                                :key="file"
                                class="px-0"
                              >
                                <v-list-item-title class="text-body-2"
                                  >{{ j + 1 }}. {{ file }}</v-list-item-title
                                >
                                <template v-slot:append>
                                  <a
                                    :href="`/files/${file}`"
                                    target="_blank"
                                    download="true"
                                  >
                                    <v-btn
                                      color="primary"
                                      size="30"
                                      variant="flat"
                                      class="ml-3"
                                    >
                                      <v-icon>mdi-download</v-icon>
                                    </v-btn>
                                  </a>
                                  <v-btn
                                    v-if="new Date() < new Date(item.date)"
                                    color="primary"
                                    :disabled="!!item.student_homeworks?.rate_description"
                                    size="30" @click="deleteFile(item.student_homeworks._id, i, j, file)"
                                    variant="flat"
                                    class="ml-1"
                                  >
                                    <v-icon>mdi-delete</v-icon>
                                  </v-btn>
                                </template>
                              </v-list-item>
                            </v-list>
                          </v-card-text>
                        </template>
                        <template v-if="item.student_homeworks?.rate_description">
                          <v-divider />
                          <v-card-text class="pb-0">
                            Baholandi: {{ item.student_homeworks.rate }} / 5
                          </v-card-text>
                          <v-card-text class="py-1 pb-0">
                            Baho izohi: {{ item.student_homeworks.rate_description }}
                          </v-card-text>
                        </template>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            height="35"
                            color="primary"
                            variant="flat"
                            @click="editItem(item)"
                            :disabled="!!item.student_homeworks?.rate_description || new Date() > new Date(item.date)"
                            >{{item.student_homeworks?"O'zgartirish":'Yuborish'}}</v-btn
                          >
                        </v-card-actions>
                      </v-card>
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
                <v-file-input
                  hide-details
                  variant="outlined"
                  color="primary"
                  v-model="files"
                  :prepend-icon="null"
                  label="Fayllar qo'shish"
                  multiple
                  :show-size="true"
                >
                  <template v-slot:selection="{ fileNames }">
                    <template v-for="fileName in fileNames" :key="fileName">
                      <v-chip size="small" label color="primary" class="me-2">
                        {{ fileName }}
                      </v-chip>
                    </template>
                  </template>
                </v-file-input>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.description"
                  label="Topshiriq izohi"
                  hide-details
                  color="primary"
                  :rules="rules"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-btn
                  variant="flat"
                  color="primary"
                  block
                  @click="validate"
                  height="45"
                >
                  Yuborish
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  <FooterPage @getDate="e=>distance = e" />
</template>

<script setup>
import { ref, watch, computed, nextTick } from "vue";
import axios from "../../axios";
import { useStore } from "vuex";
import FooterPage from "../../components/FooterPage.vue";

const store = useStore();
const dialog = ref(false);
const distance = ref("");
const items = ref([]);
const subjects = ref([]);
const subject = ref(null);
const editedIndex = ref(-1);
const editedId = ref(null);
const editedItem = ref({
  description: "",
});
const form = ref(null);
const files = ref([]);
const defaultItem = {
  description: "",
};
const formTitle = computed(() =>
  !editedId.value ? "Vazifa Yaratish" : "Vazifani O'zgartirish"
);
const rules = [(v) => !!v || "Required"];

const init = async () => {
  const { data } = await axios.get(`/subject/group/${store.getters.user?.group}`);
  subjects.value = data
  return true
};

const getHomeworks = async (distance, subject) => {
  if(!subject) return
  const {data} = await axios.get(`/homework?${distance || ""}&subject=${subject}`);
  items.value = data;
  return true
}

watch(dialog, (v) => v || close());
watch([distance, subject], ([dis, sub]) => getHomeworks(dis, sub));

const editItem = (item) => {
  editedIndex.value = items.value.indexOf(item);
  editedId.value = item.student_homeworks ? item.student_homeworks._id : null;
  editedItem.value = Object.assign(
    {},
    {
      description: item.student_homeworks?.description || "",
    }
  );
  dialog.value = true;
};
const validate = async () => {
  const { valid } = await form.value.validate();
  if (valid) save();
};
const save = async () => {
  const formdata = new FormData();
  formdata.append("homework", items.value[editedIndex.value]._id);
  formdata.append("subject", items.value[editedIndex.value].subject);
  formdata.append("description", editedItem.value.description);
  formdata.append("date", new Date().toLocaleString());
  formdata.append("student", store.getters.userid);
  formdata.append("group", store.getters.user?.group);
  files.value.map((file) => formdata.append("files", file));
  if(editedId.value) {
    const { data } = await axios.put(`/homework/edit/${editedId.value}`, formdata);
    Object.assign(items.value[editedIndex.value], { student_homeworks: data });
  }else{
    const { data } = await axios.post("/homework", formdata);
    Object.assign(items.value[editedIndex.value], { student_homeworks: data });
  }
  close();
};
const fileInputClick = () => document.getElementById("file-input").click();
const close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem);
    editedId.value = null;
    editedIndex.value = -1;
    form.value?.reset();
  });
};
const deleteFile = async (homeworkid, homeworkind, fileindex, file) => {
  if(!confirm("Bu faylni o'chirmoqchimisiz?")) return

  const { data } = await axios.put(`/homework/removefile/${homeworkid}`, { file });
  if (data) {
    items.value[homeworkind].student_homeworks.files.splice(fileindex, 1);
  }
}

init();
</script>

<style>
.resources .v-expansion-panel-text__wrapper {
  padding: 8px !important;
}
</style>