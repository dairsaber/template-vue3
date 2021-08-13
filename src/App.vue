<template>
  <div class="flex items-center max-w-sm p-6 mx-auto space-x-4 bg-white shadow-md rounded-xl">
    <div class="flex-shrink-0">
      <img class="w-12 h-12" src="/img/logo.svg" alt="ChitChat Logo" />
    </div>
    <div>
      <div class="text-xl font-medium text-black">ChitChat</div>
      <p class="text-gray-500">You have a new message!</p>
    </div>
  </div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import HelloWorld from '@/components/HelloWorld.vue'

  export default defineComponent({
    name: 'App',
    components: {
      HelloWorld,
    },
  })
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
