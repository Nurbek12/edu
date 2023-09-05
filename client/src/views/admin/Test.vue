<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="1" color="surface" width="100%"
          class="pa-2 py-4" rounded >
          <v-row justify="space-between">
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
                >Test yaratish</v-btn
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
            <v-data-table :headers="headers" :search="search" :items="items">
              <template v-slot:item.no="{ index }">
                <td data-label="T/r">{{ index + 1 }}.</td>
              </template>
              <template #item.name="{ item }">
                <td data-label="Test Nomi">{{ item.raw.name }}</td>
              </template>
              <template #item.subject="{ item }">
                <td data-label="Fan">{{ item.raw.subject }}</td>
              </template>

              <template v-slot:item.actions="{ item }">
                <td data-label="Boshqarish">
                  <div class="d-flex justify-end">
                    <v-btn variant="flat"
                      size="30" color="primary"
                      @click="editItem(item.raw)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn variant="flat" class="ml-1"
                      size="30" @click="editItemQs(item.raw)"
                      color="primary">
                      <v-icon>mdi-sitemap</v-icon>
                    </v-btn>
                    <v-btn variant="flat" class="ml-1"
                      size="30" color="primary"
                      @click="deleteItem(item.raw)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
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
      <v-card class="test-scroll">
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
                    label="Test Nomi"
                    hide-details :rules="rules"
                    color="primary"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="editedItem.subject"
                    label="Fan" :rules="rules"
                    hide-details
                    :items="subjects"
                    color="primary"
                    item-title="name"
                    item-value="name"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" class="px-3" v-if="editedId === -1">
                  <v-row>
                    <v-col cols="12" v-for="(q, j) in questions">
                      <v-card variant="outlined" class="pa-2">
                        <v-textarea
                          density="compact"
                          color="primary"
                          hide-details
                          label="Test savoli"
                          no-resize
                          variant="outlined"
                          rows="3" :rules="rules"
                          v-model="q.text"
                        >
                          <template v-slot:prepend-inner>
                            <div>{{ j + 1 }}.</div>
                          </template>
                          <template v-slot:append-inner>
                            <div>
                              <v-btn
                                size="x-small"
                                variant="text"
                                icon="mdi-close"
                                color="red"
                                @click="removeQuestion(j)"
                              ></v-btn>
                              <!-- <v-btn size="x-small" v-if="editedId!==-1" variant="text" icon="mdi-check" color="green"></v-btn> -->
                            </div>
                          </template>
                        </v-textarea>
                        <v-card-text class="pa-0">
                          <v-text-field
                            variant="outlined"
                            color="primary"
                            class="my-2"
                            hide-details
                            density="compact" :rules="rules"
                            label="A variant (to'gri javob)"
                            v-model="q.variants[0].text"
                          />
                          <v-text-field
                            variant="outlined"
                            color="primary"
                            class="my-2"
                            hide-details :rules="rules"
                            density="compact"
                            label="B variant"
                            v-model="q.variants[1].text"
                          />
                          <v-text-field
                            variant="outlined"
                            color="primary"
                            class="my-2"
                            hide-details :rules="rules"
                            density="compact"
                            label="C variant"
                            v-model="q.variants[2].text"
                          />
                          <v-text-field
                            variant="outlined"
                            color="primary"
                            class="my-2" :rules="rules"
                            hide-details
                            density="compact"
                            label="D variant"
                            v-model="q.variants[3].text"
                          />
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        variant="flat"
                        color="primary"
                        block
                        @click="addQuestion"
                        height="45"
                      >
                        Savol Qo'shish
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    variant="flat"
                    color="primary"
                    block
                    @click="validate"
                    height="45"
                  >
                    Saqlash
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="testdialog" max-width="550px" persistent>
      <v-card class="test-scroll">
        <v-card-title class="mt-2 ml-2 mb-0 text-h6 d-flex justify-space-between align-center">
          <span class="text-h5">Testlar ({{ questions?.length }})</span>
          <v-spacer></v-spacer>
          <v-btn size="30" color="primary" @click="testdialog=false">
            <v-icon size="small">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="px-2 pt-0">
          <v-container>
            <v-form ref="form1">
              <v-row>
                <v-col cols="12">
                  <v-card variant="tonal" class="pa-2">
                    <v-textarea
                      density="compact"
                      color="primary"
                      hide-details
                      label="Test savoli"
                      no-resize :rules="rules"
                      variant="outlined"
                      rows="3" v-model="questionRefs.text"
                    >
                      <template v-slot:append-inner>
                        <v-btn variant="flat" @click="validate1"
                          color="primary" size="30">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                    </v-textarea>
                    <v-card-text class="pa-0">
                      <v-text-field
                        variant="outlined"
                        color="primary"
                        class="my-2" :rules="rules"
                        hide-details v-model="questionRefs.variants[0].text"
                        density="compact"
                        label="A variant (to'gri javob)"
                      />
                      <v-text-field
                        variant="outlined"
                        color="primary"
                        class="my-2" :rules="rules"
                        hide-details v-model="questionRefs.variants[1].text"
                        density="compact"
                        label="B variant"
                      />
                      <v-text-field
                        variant="outlined"
                        color="primary"
                        class="my-2" :rules="rules"
                        hide-details v-model="questionRefs.variants[2].text"
                        density="compact"
                        label="C variant"
                      />
                      <v-text-field
                        variant="outlined"
                        color="primary"
                        class="my-2" :rules="rules"
                        hide-details v-model="questionRefs.variants[3].text"
                        density="compact"
                        label="D variant"
                      />
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-banner lines="three" class="my-1" v-for="q, i in questions" :key="i">
                    <v-banner-text><span class="text-subtitle-2">{{i+1}}. {{ q.text }}</span></v-banner-text>
                    <v-banner-text class="text-caption">a) {{ q.variants[0].text }}</v-banner-text>
                    <v-banner-text class="text-caption">b) {{ q.variants[1].text }}</v-banner-text>
                    <v-banner-text class="text-caption">c) {{ q.variants[2].text }}</v-banner-text>
                    <v-banner-text class="text-caption">d) {{ q.variants[3].text }}</v-banner-text>

                    <template v-slot:actions>
                      <v-btn variant="flat"
                        size="30" @click="editQs(q, i)"
                        color="primary"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn variant="flat" class="ml-1"
                        size="30" @click="removeQuestion(i)"
                        color="primary"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                  </v-banner>
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

const headers = [
  { title: "T/r", align: "start", key: "no", sortable: false },
  { title: "Test Nomi", key: "name" },
  { title: "Fan", key: "subject" },
  { title: "Boshqarish", key: "actions", sortable: false },
];

const rules = [(v) => !!v || "Required"];
const form = ref(null);
const form1 = ref(null);
const search = ref("");
const items = ref([]);
const dialog = ref(false);
const testdialog = ref(false);
const editedIndex = ref(-1);
const editedId = ref(-1);

const subjects = ref([]);
const questions = ref([]);

const editedqsid = ref(null);
const questionRefs = ref({
  text: "",
  variants: [
    { text: "", value: 1 },
    { text: "", value: 0 },
    { text: "", value: 0 },
    { text: "", value: 0 },
  ],
})

const editedItem = ref({
  name: "",
  subject: null,
});
const defaultItem = {
  name: "",
  subject: null,
};
const formTitle = computed(() =>
  editedIndex.value === -1 ? "Test Yaratish" : "Testni O'zgartirish"
);

watch(dialog, (v) => v || close());
watch(testdialog, (v) => v || closetest());

const initialize = async () => {
    const [sciencedata, testdata] = await Promise.all([
      axios.get("/subject"),
      axios.get("/test"),
    ]);
    items.value = testdata.data;
    subjects.value = sciencedata.data;
  },
  validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
  },
  validate1 = async () => {
    const { valid } = await form1.value.validate();
    if (valid) createQuestion()
  },
  editItem = (item) => {
    editedIndex.value = items.value.indexOf(item);
    editedId.value = item._id;
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
  },
  editItemQs = async (item) => {
    if(!item.questions){
      const { data } = await axios.get(`/test/id/${item._id}`)
      item.questions = data.questions;
    }
    editedIndex.value = items.value.indexOf(item);
    editedId.value = item._id;
    questions.value = item.questions
    testdialog.value = true;
  },
  editQs = (item, i) => {
    editedqsid.value = i
    questionRefs.value = Object.assign({}, item)
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
    const { data } = await axios.delete(`/test/${editedId.value}`);
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
      form1.value?.reset()
    });
  },
  closetest = () => {
    testdialog.value = false;
    nextTick(() => {
      editedItem.value = Object.assign({}, defaultItem);
      editedId.value = -1;
      questions.value = []
      editedIndex.value = -1;
      editedqsid.value = null
      questionRefs.value = Object.assign({}, {
        text: "",
        variants: [
          { text: "", value: 1 },
          { text: "", value: 0 },
          { text: "", value: 0 },
          { text: "", value: 0 },
        ],
      })
    });
  },
  save = async () => {
    if (editedIndex.value > -1) {
      const { data } = await axios.put(`/test/${editedId.value}`, editedItem.value);
      Object.assign(items.value[editedIndex.value], data);
    } else {
      const { data } = await axios.post("/test", {
        questions: questions.value,
        ...editedItem.value,
      });
      items.value.push(data);
    }
    close();
  },
  addQuestion = () => {
    questions.value.push({
      text: "",
      variants: [
        { text: "", value: 1 },
        { text: "", value: 0 },
        { text: "", value: 0 },
        { text: "", value: 0 },
      ],
    });
    nextTick(() => {
      document.querySelector(".test-scroll").scrollTop =
        document.querySelector(".test-scroll").scrollHeight;
    });
  },
  removeQuestion = async (i) => {
    if(confirm("Ushbu malumotni o'chirmoqchimisiz?")){
      if(questions.value[i]._id){
        await axios.delete(`/test/question/${questions.value[i]._id}`);
      }
      questions.value.splice(i, 1);
    }
  },
  createQuestion = async () => {
    if(editedqsid.value !== null) {
      delete questionRefs.value._id
      const { data } = await axios.put(`/test/question/${questions.value[editedqsid.value]._id}`, questionRefs.value)
      Object.assign(questions.value[editedqsid.value], data)
    }else{
      const { data } = await axios.post('/test/question', {test: editedId.value,...questionRefs.value})
      questions.value.push(data)
    }
    editedqsid.value = null
    questionRefs.value = Object.assign({}, {
      text: "",
      variants: [
        { text: "", value: 1 },
        { text: "", value: 0 },
        { text: "", value: 0 },
        { text: "", value: 0 },
      ],
    })
    form1.value?.reset()
  };

initialize();
</script>