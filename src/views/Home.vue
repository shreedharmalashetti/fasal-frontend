<template>
  <sidebar v-if="isSidebarOpen" @click.self="isSidebarOpen = false" />

  <div class="container mx-auto max-w-2xl">
    <v-header class="bg-indigo-500">
      <template #left>
        <fa-icon @click="isSidebarOpen = true" icon="bars" class="icon" />
      </template>
      <template #center>Movie library </template>
    </v-header>
    
    <div class="text-center p-10">
      <router-link to="/movies" class="btn btn-pink">Movies</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
const isSidebarOpen = ref(false);
</script>
