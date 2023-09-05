<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent width="250" floating elevation="2" app :expand-on-hover="mobile">
    <v-list :lines="false" nav mandatory variant="flat">
      <v-list-item v-for="(item, i) in links[store.getters.role]" link :to="item.url" :key="i" :value="item" color="primary">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
    <v-btn position="absolute" v-if="!mobile" :icon="`mdi-chevron-${!rail ? 'left' : 'right'}`" size="x-small" @click="rail = !rail" style="right: -15px"></v-btn>
    <template v-slot:append>
      <v-list :lines="false" nav>
        <v-list-item v-if="store.getters.user?.role === 'student'" :disabled="download" @click="downloadReference" link color="primary">
          <template v-slot:prepend>
            <v-icon>mdi-download-box</v-icon>
          </template>
          
          <v-list-item-title>Ma'lumotnoma</v-list-item-title>
        </v-list-item>
        <v-list-item @click="store.commit('logout')" to="/login" link>
          <template v-slot:prepend>
            <v-icon>mdi-logout-variant</v-icon>
          </template>

          <v-list-item-title>Chiqish</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useDisplay, useTheme } from "vuetify";
import { useStore } from "vuex";
import axios from "../axios";

const store = useStore();
const mobile = useDisplay().mobile;

watch(mobile, () => {
  if (mobile) rail.value = true;
});
const drawer = ref(true);
const rail = ref(true);
const download = ref(false);

const links = {
  admin: [
    { title: "Bosh sahifa", url: "/admin", icon: "mdi-view-dashboard" },
    { title: "Fanlar", url: "/admin/subjects", icon: "mdi-book-open-page-variant", },
    { title: "Guruhlar", url: "/admin/groups", icon: "mdi-account-box" },
    { title: "Testlar bazasi", url: "/admin/tests", icon: "mdi-folder-question", },
    { title: "Talabalar", url: "/admin/students", icon: "mdi-account-school" },
    { title: "O'qituvchilar", url: "/admin/teachers", icon: "mdi-account-tie-woman", },
    { title: "Dars jadvali", url: "/admin/table", icon: "mdi-clipboard-list" },
    { title: "Shaxsiy", url: "/profile", icon: "mdi-cog" },
  ],
  student: [
    { title: "Bosh sahifa", url: "/student", icon: "mdi-view-dashboard" },
    { title: "Fanlar ma'ruzalari", url: "/resources", icon: "mdi-bookshelf" },
    { title: "Fanlar topshiriqlari", url: "/homeworks", icon: "mdi-book-open-variant", },
    { title: "Imtihonlar", url: "/exams", icon: "mdi-timer-edit" },
    { title: "Imtihonlar jadvali", url: "/exams/calendar", icon: "mdi-calendar-clock", },
    { title: "Dars jadvali", url: "/schedule", icon: "mdi-calendar-month" },
    { title: "Davomat", url: "/attendences", icon: "mdi-clipboard-text" },
    { title: "Baholar", url: "/rates", icon: "mdi-calendar-star" },
    { title: "Imtihon natijalari", url: "/rates/exam", icon: "mdi-calendar-text", },
    { title: "Oraliq natijalari", url: "/rates/midterm", icon: "mdi-comment-question", },
    { title: "Profil", url: "/profile", icon: "mdi-cog" },
  ],
  teacher: [
    { title: "Bosh sahifa", url: "/teacher", icon: "mdi-view-dashboard" },
    { title: "Dars jadvali", url: "/teacher/table", icon: "mdi-clipboard-text-clock", },
    { title: "Davomat", url: "/teacher/attendence", icon: "mdi-format-list-bulleted-square", },
    { title: "Ma'ruzalar", url: "/teacher/resource", icon: "mdi-human-male-board-poll", },
    { title: "Topshiriqlar", url: "/teacher/homework", icon: "mdi-book-education", },
    { title: "Oraliq nazorat", url: "/teacher/midterm", icon: "mdi-comment-question", },
    { title: "Shaxsiy", url: "/profile", icon: "mdi-cog" },
  ],
  inspector: [
    { title: "Bosh sahifa", url: "/inspector", icon: "mdi-view-dashboard" },
    { title: "Natijalar", url: "/results", icon: "mdi-podium-gold" },
    { title: "Profil", url: "/profile", icon: "mdi-cog" },
  ],
  secret: [
    { title: "Natijalar", url: "/secret", icon: "mdi-podium-gold" },
    { title: "Profil", url: "/profile", icon: "mdi-cog" },
  ],
  dean: [
    { title: "Bosh sahifa", url: "/dean", icon: "mdi-view-dashboard" },
    { title: "Dars jadvali", url: "/dean/table", icon: "mdi-clipboard-list" },
    { title: "Imtihonlar", url: "/dean/exams", icon: "mdi-text-box-edit-outline", },
    { title: "Ruxsatlar", url: "/dean/access", icon: "mdi-lock-plus" },
    { title: "Davomat", url: "/dean/attendance", icon: "mdi-list-box" },
    { title: "Sababli", url: "/dean/explicables", icon: "mdi-text-box-check" },
    { title: "Talabalar", url: "/dean/students", icon: "mdi-account-school" },
    { title: "Baholar", url: "/dean/rates", icon: "mdi-ballot" },
    { title: "Profil", url: "/profile", icon: "mdi-cog" },
  ],
  accountant: [
    { title: "Talabalar", url: "/accountant", icon: "mdi-account-school" },
    { title: "Profil", url: "/profile", icon: "mdi-cog" },
  ],
  director: [
    { title: "Hisobotlar", url: "/director", icon: "mdi-chart-areaspline" },
    { title: "Hodimlar", url: "/director/inspectors", icon: "mdi-shield-star", },
    { title: "Profil", url: "/profile", icon: "mdi-cog" },
  ],
};

const downloadReference = async () => {
  download.value = true
  await axios({
    method: "get",
    url: "/user/download-info",
    responseType: "blob",
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Talaba-malumot.pdf");
    document.body.appendChild(link);
    link.click();
  });
  download.value = false
};
</script>

<style>
.semestr .v-list-item--density-compact.v-list-item--one-line {
  min-height: 30px !important;
}
</style>