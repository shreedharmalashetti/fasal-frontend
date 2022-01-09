<template>
  <div class="mx-auto bg-blue-300 p-2 flex flex-col justify-between space-y-2">
    <div class="mx-auto">
      <img :src="props.poster" :alt="props.title" class="h-full w-full" />
    </div>

    <div>{{ props.title }} ({{ props.year }})</div>
    <div>languages: {{ props.languages }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
  year: Number,
  languages: String,
  poster: String,
});
</script>
