<template>
  <div class="container mx-auto max-w-2xl">
    <div class="sticky top-0 ">
      <div class="relative">
        <v-header class="bg-green-500 ">
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
              class="px-3 text-lg rounded cursor-pointer"
              >All</a
            >
            <a
              @click="accessType = 'public'"
              :class="{ 'bg-indigo-500': accessType == 'public' }"
              class="px-3 text-lg rounded cursor-pointer"
            >
              Public
            </a>
            <a
              @click="accessType = 'private'"
              :class="{ 'bg-indigo-500': accessType == 'private' }"
              class="px-3 text-lg rounded cursor-pointer"
            >
              Private
            </a>
          </template>
          <template #right>
            <div
              @click="canAddMovie = !canAddMovie"
              class="p-1 text-2xl w-6 text-center"
              :class="{
                'bg-red-500': canAddMovie,
                'bg-blue-400': !canAddMovie,
              }"
            >
              <fa-icon v-if="!canAddMovie" icon="plus" />
              <fa-icon v-if="canAddMovie" icon="times" />
            </div>
          </template>
        </v-header>

        <add-movie
          v-if="canAddMovie"
          :access-type="accessType == 'all' ? 'public' : accessType"
          @added="canAddMovie=!canAddMovie"
          class="absolute "
        ></add-movie>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <poster
        v-for="(movie, i) in currentMovies"
        :key="i"
        :title="movie.title"
        :year="movie.year"
        :languages="movie.languages"
        :poster="movie.poster"
        @click="$router.push('/movie/' + movie.id)"
      >
      </poster>
    </div>
  </div>

  <div v-if="currentMovies.length == 0" class="text-center">
    <div>no movies found</div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, inject, onUnmounted } from "vue";
import { movies } from "../store/movies";

import Poster from "../components/Poster.vue";
import AddMovie from "../components/addMovie/index.vue";

const accessType = ref("all");
const canAddMovie = ref(false);

const loadingValue = inject("loadingValue");

const currentMovies = computed(() => {
  if (accessType.value == "all") return movies.state.movies;
  return movies.state.movies.filter((m) => m.accessType == accessType.value);
});

onMounted(async () => {
  await movies.getAllMovies((d) => (loadingValue.value = d));
});

onUnmounted(() => {
  loadingValue.value = false;
});
</script>
