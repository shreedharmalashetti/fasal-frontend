<template>
  <div class="shadow space-y-2 bg-indigo-300">
    <!-- title  -->
    <div class="flex flex-col mx-3">
      <label for="c1" class="text-lg">Title</label>
      <input
        v-model="form.title"
        type="text"
        id="c1"
        placeholder="enter title"
        class="border rounded p-3 text-gray-700"
      />
    </div>

    <!-- year  -->
    <div class="flex flex-col mx-3">
      <label for="c2" class="text-lg">Year</label>
      <input
        v-model="form.year"
        type="text"
        id="c2"
        placeholder="enter Year"
        class="border rounded p-3 text-gray-700"
      />
    </div>

    <!-- languages  -->
    <div class="flex flex-col mx-3">
      <label for="c3" class="text-lg">Languages</label>
      <input
        v-model="form.languages"
        type="text"
        id="c3"
        placeholder="enter languages"
        class="border rounded p-3 text-gray-700"
      />
    </div>

    <!-- poster  -->
    <div class="flex flex-col mx-3">
      <label for="c3" class="text-lg">Poster</label>
      <input
        v-model="form.poster"
        type="text"
        id="c4"
        placeholder="enter poster url"
        class="border rounded p-3 text-gray-700"
      />
    </div>
    <!-- video  -->
    <div class="flex flex-col mx-3">
      <label for="c5" class="text-lg">Video</label>
      <input
        v-model="form.video"
        type="text"
        id="c5"
        placeholder="enter video url"
        class="border rounded p-3 text-gray-700"
      />
    </div>

    <!-- Add -->
    <div class="text-center p-4">
      <button @click="addMovie()" class="btn btn-pink">Add</button>
    </div>
  </div>
</template>
<script setup>
import { form, addMovie } from "./index.js";
</script>
