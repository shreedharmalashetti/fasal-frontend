<template>
  <div class="flex items-center space-x-2 bg-light-200">
    <div class="w-15 h-15">
      <img :src="props.poster" alt="" class="w-full h-full" />
    </div>
    <div>{{ props.title }} ({{ props.year }})</div>
  </div>
</template>
<script setup>
const props = defineProps({
  poster: String,
  title: String,
  year: Number,
});
</script>
