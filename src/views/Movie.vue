<template>
  <div
    v-if="currentMovie"
    class="container max-w-md mx-auto bg-blue-300 flex space-x-2 items-center"
  >
    <div class="">
      <img
        :src="currentMovie.poster"
        :alt="currentMovie.title"
        class="w-full h-full"
      />
    </div>

    <div class="space-y-2">
      <div>{{ currentMovie.title }} ({{ currentMovie.year }})</div>
      <div>languages : {{ currentMovie.languages }}</div>
      <div>hasVideo : {{ currentMovie.video ? true : false }}</div>

      <div
        v-if="user.state.id == currentMovie.userId"
        class="text-center space-y-2 "
      >
        <button @click="deleteMovie()" class="btn btn-red block">delete</button>
        <button @click="canUpdate = true" class="btn btn-red block">update</button>
      </div>
    </div>
  </div>

  <div v-if="!currentMovie" class="text-center p-10">
    <div>no movie found</div>
  </div>

  <v-modal v-if="canUpdate" @click.self="canUpdate = false" class="z-30">
    <div class="shadow space-y-2 bg-indigo-300 container">
      <!-- title  -->
      <div class="flex flex-col mx-3">
        <label for="c1" class="text-lg">Title</label>
        <input
          v-model="currentMovie.title"
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
          v-model="currentMovie.year"
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
          v-model="currentMovie.languages"
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
          v-model="currentMovie.poster"
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
          v-model="currentMovie.video"
          type="text"
          id="c5"
          placeholder="enter video url"
          class="border rounded p-3 text-gray-700"
        />
      </div>

      <!-- Add -->
      <div class="text-center p-4">
        <button @click="updateMovie()" class="btn btn-pink">update</button>
      </div>
    </div>
  </v-modal>
</template>
<script setup>
import { inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { movies } from "../store/movies.js";
import { user } from "../store/user.js";

const route = useRoute();
const router = useRouter();

const loadingValue = inject("loadingValue");
const currentMovie = ref(null);

const canUpdate = ref(false);

const deleteMovie = async () => {
  await movies.deleteMovie(
    currentMovie.value.id,
    (d) => (loadingValue.value = d)
  );
  router.go(-1);
};

const updateMovie = async () => {
  await movies.updateMovie(
    { ...currentMovie.value },
    (d) => (loadingValue.value = d)
  );
  canUpdate.value = false;
};

onMounted(async () => {
  if (!route.params.id) return;
  currentMovie.value = await movies.getMovie(
    route.params.id,
    (d) => (loadingValue.value = d)
  );
});
</script>
