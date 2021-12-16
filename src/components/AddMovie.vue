<template>
  <div class="">
    <div class="w-2/4 z-20 mx-auto h-full">
      <div class="bg-gray-400 space-y-2 py-2">
        <div class="flex flex-col mx-3">
          <label for="name" class="text-lg">name</label>
          <input
            v-model="form.name"
            id="name"
            placeholder="enter movie name"
            class="border rounded p-3 text-gray-700"
          />
        </div>
        <div class="flex flex-col mx-3">
          <label for="year" class="text-lg">year</label>
          <input
            v-model="form.year"
            id="year"
            placeholder="enter movie year"
            class="border rounded p-3 text-gray-700"
          />
        </div>
        <div v-if="isLoading" class="text-red-900 text-center">
          {{ typeof isLoading == "boolean" ? "searching..." : isLoading }}
        </div>
        <div class="text-center">
          <button @click="searchMovie()" class="btn btn-pink">search</button>
          <div>
            {{props.accessType}}
          </div>
        </div>
      </div>

      <div
        v-if="searchResult.length > 0"
        class="bg-indigo-200 px-2 space-y-2 py-2 overflow-y-auto max-h-sm"
      >
        <search-info
          v-for="(movie, i) in searchResult"
          :key="i"
          :poster="movie.poster"
          :title="movie.title"
          :year="movie.year"
          @click="addMovie(movie.imdbid)"
        >
        </search-info>
      </div>
    </div>
  </div>
</template>
<script setup>
import SearchInfo from "./SearchInfo.vue";
import { movies } from "../store/movies.js";
import { reactive, ref } from "vue";

const searchResult = ref([]);

const props = defineProps({
  accessType: String,
});

const form = reactive({
  name: null,
  year: null,
});

const isLoading = ref(false);

const searchMovie = async () => {
  if (!(form.name || form.year))
    return (isLoading.value = "name or year required");
  isLoading.value = true;
  try {
    searchResult.value = await movies.searchMovie({ ...form });
    isLoading.value = false;
  } catch (error) {
    isLoading.value = error.message;
  }
};

const addMovie = async (id) => {
  isLoading.value = "adding movie...";
  try {
    const movie = await movies.addMovie(id, props.accessType);

    isLoading.value = false;
  } catch (error) {
    isLoading.value = error.message;
  }
};
</script>
