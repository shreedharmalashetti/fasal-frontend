<template>
  <div class="bg-gray-400 py-2 w-full">
    <div class="bg-white m-2 p-2">
      <div class="font-semibold">AddOption:</div>
      <div class="flex space-x-1">
        <div>
          <input type="radio" id="one" value="custom" v-model="addOption" />
          <label for="one">Costom</label>
        </div>

        <div>
          <input type="radio" id="two" value="imdb" v-model="addOption" />
          <label for="two">Imdb</label>
        </div>

        <div>
          <input type="radio" id="three" value="youtube" v-model="addOption" />
          <label for="three">Youtube</label>
        </div>
      </div>
    </div>

    <div class="bg-white m-2 p-2 flex space-x-1">
      <div class="font-semibold">AccessType:</div>
      <div>
        {{ props.accessType }}
      </div>
    </div>

    <div class="bg-white m-2 p-2 h-sm overflow-auto">
      <component :is="dynamicComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted } from "vue";

import Custom from "./Custom.vue";
import Imdb from "./Imdb.vue";
import Youtube from "./Youtube.vue";

import { initialize } from "./index.js";

const props = defineProps({
  accessType: String,
});
const emit = defineEmits(["added"]);

const loadingRef = inject("loadingValue");
const addOption = ref("custom");

const dynamicComponent = computed(() => {
  if (addOption.value == "custom") return Custom;
  if (addOption.value == "imdb") return Imdb;
  if (addOption.value == "youtube") return Youtube;
});

onMounted(() => {
  initialize(loadingRef, props.accessType, () => emit("added"));
});
</script>
