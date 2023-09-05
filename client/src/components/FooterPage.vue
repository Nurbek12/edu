<template>
  <v-footer app elevation="1" color="background">
    <v-sheet color="transparent" width="100%" rounded>
      <v-pagination density="comfortable" elevation="1" :length="4" v-model="semester"  active-color="primary"
        @update:modelValue="$event=>$emit('getDate', getSemesterInterval(start_year, $event))" >
        <template v-slot:item="{ props, page }">
          <v-btn size="35" v-bind="props" flat elevation="1">{{ page }}</v-btn>
        </template>
      </v-pagination>
    </v-sheet>
  </v-footer>
</template>

<script setup>
import { ref } from "vue"
import { useStore } from 'vuex'

const store = useStore()
const start_year = parseInt(store.getters.user?.start_year|0);
const semester = ref(0);

// const emit = defineEmits(['getDate'])

function getSemesterInterval(startYear, currentSemester) {
  currentSemester = parseInt(currentSemester)
  startYear = parseInt(startYear)
  const year = startYear + Math.floor(currentSemester / 2);
  const month = currentSemester%2===0?5:10;
  let start, end;
  if (month >= 9 || month <= 2) {
    start = new Date(year, 8, 1);
    end = new Date(year+1, 1, 28);
  } else {
    start = new Date(year, 2, 1);
    end = new Date(year, 7, 31);
  }
  const query = new URLSearchParams({
    gte: start.toISOString(),
    lte: end.toISOString(),
  })
  
  return query
}

const calculateSemester = (startYear) => {
  // const currentDate = new Date();
  // const yearDiff = currentDate.getFullYear() - startYear;
  // let currentSemester = 1;
  // if (yearDiff > 0) currentSemester += (yearDiff) * 2;
  // if (currentDate.getMonth() >= 2 && currentDate.getMonth() <= 7) currentSemester += 1;
  // semester.value = currentSemester;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // месяцы в JS начинаются с 0

  let semesterC = (currentYear - startYear) * 2;

  if (currentMonth >= 8 || currentMonth <= 0) semesterC += 1;
  else semesterC += 2;

  semester.value = semesterC
  return semesterC;
};

calculateSemester(start_year);
</script>