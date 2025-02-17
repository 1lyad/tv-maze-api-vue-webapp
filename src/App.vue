<script setup lang="ts">
import { RouterView } from 'vue-router'
import MyHeader from './components/layout/MyHeader.vue'
import MyFooter from './components/layout/MyFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <MyHeader />
    <main
      class="mx-auto min-h-screen w-full max-w-5xl flex-grow bg-white/80 backdrop-blur-xl xl:max-w-7xl"
    >
      <RouterView />
    </main>
    <MyFooter />
  </div>
</template>

<style scoped lang="css"></style>
