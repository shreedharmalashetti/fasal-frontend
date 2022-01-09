<template>
  <div
    v-if="currentMovie"
    class="mx-auto bg-blue-300 p-2 flex flex-col justify-between space-y-2"
  >
    <div class="w-72 h-72 mx-auto">
      <img
        :src="currentMovie.poster"
        :alt="currentMovie.title"
        class="h-full w-full"
      />
    </div>

    <div>{{ currentMovie.title }} ({{ currentMovie.year }})</div>
    <div>{{ currentMovie.runtime }} | {{ currentMovie.genres }}</div>
    <div>rating: {{ currentMovie.rating }}</div>
    <div class="py-1">{{ currentMovie.plot }}</div>
    <div>director: {{ currentMovie.director }}</div>
    <div>stars: {{ currentMovie.actors }}</div>

    <div v-if="user.state.id == currentMovie.userId" class="text-center">
      <button @click="deleteMovie()" class="btn btn-red">delete</button>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { movies } from "../store/movies.js";
import { user } from "../store/user.js";

const props = defineProps({
  imdbid: String,
});

const currentMovie = computed(() => {
  if (!props.imdbid) return;
  return movies.state.movies.find((m) => m.imdbid == props.imdbid);
});

const deleteMovie = () => {
  movies.deleteMovie(props.imdbid);
};
</script>
