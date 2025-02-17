<script setup lang="ts">
import { useRouter } from 'vue-router'
import MyLogo from './MyLogo.vue'
import { FILTER_DEFAULTS } from '@/types/constants'

const router = useRouter()
/**
 * Navigate to a random show.
 *
 * @remarks
 * The show ID is a random number between 1 and
 * `FILTER_DEFAULTS.TOTAL_SHOWS` (inclusive).
 */
function goToRandomShow() {
  const randomNumber = Math.floor(Math.random() * FILTER_DEFAULTS.TOTAL_SHOWS) + 1
  router.push(`/shows/${randomNumber}`)
}
</script>

<template>
  <header
    class="border-primary-300 sticky flex min-h-20 flex-col items-center justify-between gap-4 border-b-4 bg-black !px-4 py-4 sm:flex-row sm:gap-10 sm:!px-40"
  >
    <MyLogo />
    <nav class="space-x-4">
      <RouterLink
        class="text-primary-50 hover:text-primary-300 transition-colors duration-300"
        to="/"
      >
        Shows List
      </RouterLink>
      <button
        class="text-primary-50 hover:text-primary-300 cursor-pointer transition-colors duration-300"
        @click="goToRandomShow"
      >
        I'm Feeling Lucky
      </button>
    </nav>
  </header>
</template>

<style scoped lang="css"></style>
