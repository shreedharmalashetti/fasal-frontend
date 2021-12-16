<template>
  <div class="container mx-auto max-w-2xl">
    <div class="sticky top-0">
      <div class="relative">
        <v-header class="bg-green-500">
          <template #left>
            <fa-icon
              @click="$router.go(-1)"
              icon="arrow-left"
              class="icon text-2xl"
            />
          </template>
          <template #center>
            <a
              @click="accessType = 'all'"
              :class="{ 'bg-indigo-500': accessType == 'all' }"
              class="px-3 rounded"
              >All</a
            >
            <a
              @click="accessType = 'public'"
              :class="{ 'bg-indigo-500': accessType == 'public' }"
              class="px-3 rounded"
            >
              Public
            </a>
            <a
              @click="accessType = 'private'"
              :class="{ 'bg-indigo-500': accessType == 'private' }"
              class="px-3 rounded"
            >
              Private
            </a>
          </template>
          <template #right>
            <button @click="canAddMovie = !canAddMovie" class="btn btn-blue">
              {{ !canAddMovie ? "add" : "cancel" }}
            </button>
          </template>
        </v-header>

        <add-movie
          v-if="canAddMovie"
          :access-type="accessType == 'all' ? 'public' : accessType"
          class="absolute w-full"
        ></add-movie>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-4 py-2">
      <movie-info
        v-for="(movie, i) in currentMovies"
        :key="i"
        :imdbid="movie.imdbid"
      >
      </movie-info>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { movies } from "../store/movies";

import MovieInfo from "../components/MovieInfo.vue";
import AddMovie from "../components/AddMovie.vue";

const accessType = ref("all");
const canAddMovie = ref(false);

const currentMovies = computed(() => {
  if (accessType.value == "all") return movies.state.movies;
  return movies.state.movies.filter((m) => m.accessType == accessType.value);
});

onMounted(() => {
  movies.getAllMovies();
});
</script>
