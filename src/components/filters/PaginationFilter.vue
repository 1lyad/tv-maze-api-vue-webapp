<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emits = defineEmits<{
  (e: 'pageChanged', newPage: number): void
}>()

/**
 * Go to the previous page if there is one.
 *
 * If the current page is the first one, do nothing.
 *
 * @emits pageChanged with the new page number
 */

function goToPrevious() {
  if (props.currentPage > 0) {
    emits('pageChanged', props.currentPage - 1)
  }
}

/**
 * Go to the next page if there is one.
 *
 * If the current page is the last one, do nothing.
 *
 * @emits pageChanged with the new page number
 */
function goToNext() {
  if (props.currentPage < props.totalPages - 1) {
    emits('pageChanged', props.currentPage + 1)
  }
}
</script>

<template>
  <div class="mt-4 flex items-center justify-center gap-4 bg-gray-50 text-xs">
    <button
      @click="goToPrevious"
      :disabled="currentPage === 0"
      class="transition-color hover:bg-primary-50 cursor-pointer bg-gray-50 px-3 py-1 transition-colors duration-300 disabled:!cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-50"
    >
      ←
    </button>
    <span class="text-center">Page <br />{{ currentPage }} of {{ totalPages }}</span>
    <button
      @click="goToNext"
      :disabled="currentPage >= totalPages - 1"
      class="transition-color hover:bg-primary-50 cursor-pointer bg-gray-50 px-3 py-1 transition-colors duration-300 disabled:!cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-50"
    >
      →
    </button>
  </div>
</template>

<style scoped lagn="css"></style>
