<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-30">
    <div class="bg-white h-full w-3/4 md:w-1/4">
      <div v-if="user.state.token" class="space-y-4">
        <div class="bg-black text-white space-y-4 p-2">
          <div class="text-center">
            <fa-icon icon="user" class="text-5xl" />
          </div>

          <div class="text-white flex justify-center items-center">
            <div class="text-2xl text-indigo-500">{{ user.state.name }}</div>
          </div>

          <div class="space-x-2 flex justify-between flex-wrap">
            <button
              @click="$router.replace('/updateuser'), (isSidebarOpen = false)"
              class="btn btn-pink"
            >
              update
            </button>
            <button @click="logout()" class="btn btn-red">logout</button>
          </div>
        </div>
      </div>

      <!-- user not logged in  -->
      <div v-if="!user.state.token" class="bg-black flex justify-between p-2">
        <router-link
          @click="isSidebarOpen = false"
          class="btn btn-blue"
          to="/signin"
          >signin</router-link
        >
        <router-link
          @click="isSidebarOpen = false"
          class="btn btn-pink"
          to="/signup"
          >signup</router-link
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { user } from "../store/user.js";

const logout = async () => {
  await user.signOut();
};
</script>
