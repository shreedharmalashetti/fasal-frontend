<template>
  <div class="">
    <div class="space-y-2 bg-dark-500 text-white p-2">
      <!-- title  -->
      <div class="flex flex-col mx-3">
        <label for="is1" class="text-lg">Name</label>
        <input
          v-model="imdbSearchForm.name"
          type="text"
          id="is1"
          placeholder="enter movie name"
          class="border rounded p-3 text-gray-700"
        />
      </div>

      <!-- year  -->
      <div class="flex flex-col mx-3">
        <label for="is2" class="text-lg">Year</label>
        <input
          v-model="imdbSearchForm.year"
          type="text"
          id="is2"
          placeholder="enter Year"
          class="border rounded p-3 text-gray-700"
        />
      </div>

      <!-- ImdbId  -->
      <div class="flex flex-col mx-3">
        <label for="is3" class="text-lg">ImdbId</label>
        <input
          v-model="imdbSearchForm.id"
          type="text"
          id="is3"
          placeholder="enter imdb id"
          class="border rounded p-3 text-gray-700"
        />
      </div>

      <!-- search  -->
      <div class="text-center p-4">
        <button @click="imdbSearch()" class="btn btn-pink">search</button>
      </div>

      <!-- search result  -->
      <div v-if="imdbSearchResult.length > 0" class="px-4 space-y-1">
        <div
          v-for="(movie, i) in imdbSearchResult"
          :key="i"
          @click="updateForm(movie, () => (imdbSearchResult = []))"
          class="flex items-center space-x-2 bg-light-200 text-black"
        >
          <div class="w-15 h-15">
            <img :src="movie.poster" alt="" class="w-full h-full" />
          </div>
          <div>{{ movie.title }} ({{ movie.year }})</div>
        </div>
      </div>
    </div>

    <Custom v-if="imdbSearchResult.length == 0 && form.title" />
  </div>
</template>

<script setup>
import Custom from "./Custom.vue";

import {
  form,
  updateForm,
  imdbSearchForm,
  imdbSearch,
  imdbSearchResult,
} from "./index.js";
</script>
