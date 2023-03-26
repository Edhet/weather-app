<template>
  <section class="flex flex-col bg-white/20 p-3 backdrop-blur-sm h-fit my-auto mx-1 rounded-lg border border-white ">
    <h2 class="italic text-xl"> {{ props.errorMessage.error.message }} </h2>
    <button class="flex font-bold mt-2 mx-auto p-1 rounded-full hover:bg-white/40 focus:outline-none focus:bg-white/60 transition-all" @click="closeBtn()">
      Ok
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2 fill-white my-auto ml-1" viewBox="0 0 16 16">
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
      </svg>
    </button>
  </section>
</template>


<script lang="ts" setup>
import { onMounted } from "vue";

const emit = defineEmits<{
  (e: "closeInfo"): void
}>();

const props = defineProps<{
  errorMessage: any
}>();

onMounted(() => document.addEventListener("keyup", $event => keyboardClose($event)));

function keyboardClose(event: KeyboardEvent) {
  if (event.key == "Escape" || event.key == "Enter")
    closeBtn();
}

function closeBtn() {
  emit("closeInfo");
}
</script>
