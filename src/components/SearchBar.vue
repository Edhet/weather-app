<template>
  <section class="flex backdrop-blur-sm h-fit my-auto md:text-xl lg:text-4xl rounded-lg border border-white
    message before:block before:absolute before:-top-14 before:md:-top-12 before:w-full before:text-white/80 before:text-base before:text-center">

    <input class="bg-white/20 rounded-l-lg p-3 h-1/2 hover:bg-white/40 focus:outline-none focus:bg-white/60 transition-all placeholder:text-white/40" v-model="cityName" placeholder="City Name" @keyup="keyboardPress($event)" ref="searchBar">
    <button class="bg-white/20 rounded-r-lg p-3 min-w-[4rem] hover:bg-white/40 focus:outline-none focus:bg-white/60 transition-all" @click="searchName()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle mx-auto" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
      </svg>
    </button>
  </section>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const emit = defineEmits<{
  (e: "searchCity", cityName: string): void
}>();

const searchBar = ref<HTMLElement | null>(null);

let cityName = "";

onMounted(() => document.addEventListener("keydown", $event => {
  if (searchBar.value)
    if ($event.ctrlKey)
      searchBar.value.focus();
    else if ($event.key == "Escape")
      searchBar.value.blur();
}));

function keyboardPress(event: KeyboardEvent) {
  if (event.key == "Enter")
    searchName();
}

function searchName() {
  if (!cityName)
    return;
  emit("searchCity", cityName);
  cityName = "";
}
</script>

<style scoped>
.message::before {
  content: "Insert a city name to get the climate details";
}
</style>