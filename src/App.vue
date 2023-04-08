<script lang="ts" setup>
import { reactive } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import CityInformation from "@/components/cityInformation.vue";
import ErrorInformation from "@/components/errorInformation.vue";

const myApiKey = "715b9af3ec5e40c4a0f184452232303";
const state = reactive({
  showSearchBar: true,
  errorOccurred: false,
  backgroundColor: "bg-day-cloud-0"
});

let apiResponse: any;

async function makeApiCall(cityName: string) {
  const apiRequest = `https://api.weatherapi.com/v1/current.json?key=${myApiKey}&q=${cityName}&aqi=yes&alerts=yes`;
  apiResponse = await fetch(apiRequest).then(result => apiResponse = result.json());

  state.errorOccurred = Boolean(apiResponse.error);
  state.showSearchBar = false;
  if (!state.errorOccurred)
    changeBackground(Boolean(apiResponse.current.is_day), apiResponse.current.cloud);
}

function changeBackground(isDay: boolean, cloudPercentage: number) {
  let timeOfDay = (isDay) ? "day" : "night";

  let discreteCloudPercentage;
  if (cloudPercentage >= 75) discreteCloudPercentage = "75";
  else if (cloudPercentage >= 50) discreteCloudPercentage = "50";
  else if (cloudPercentage >= 25) discreteCloudPercentage = "25";
  else discreteCloudPercentage = "0";

  state.backgroundColor = "bg-" + timeOfDay + "-cloud-" + discreteCloudPercentage;
}

function closeInformation() {
  state.showSearchBar = true;
}
</script>

<template>
  <main class="min-w-screen min-h-screen flex justify-center text-white fill-white transition-all" v-bind:class="state.backgroundColor">
    <div class="absolute flex mt-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-haze2-fill fill-white my-auto mr-2 w-8 h-8" viewBox="0 0 16 16">
        <path d="M8.5 2a5.001 5.001 0 0 1 4.905 4.027A3 3 0 0 1 13 12H3.5A3.5 3.5 0 0 1 .035 9H5.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 3.871-2.977A5.001 5.001 0 0 1 8.5 2zm-6 8a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zM0 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
      </svg>
      <h1 class="text-xl">Weather App</h1>
    </div>
    <search-bar class="entering-animation" @searchCity="makeApiCall($event)" v-if="state.showSearchBar"></search-bar>
    <template v-else>
      <error-information class="entering-animation" v-bind:error-message="apiResponse" @closeInfo="closeInformation()" v-if="state.errorOccurred"></error-information>
      <city-information class="entering-animation" v-bind:city-info="apiResponse" @closeInfo="closeInformation()" v-else></city-information>
    </template>

    <a class="absolute flex mb-4 bottom-0 p-1 rounded-full hover:bg-white/40 focus:outline-none focus:bg-white/60 transition-all" href="https://github.com/Edhet/weather-app" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github my-auto" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <p class="ml-2"> Source</p>
    </a>
  </main>
</template>
