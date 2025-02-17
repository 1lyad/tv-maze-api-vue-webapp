<script setup lang="ts">
defineProps<{
  message: string
  showRetry?: boolean
}>()

defineEmits<{
  (e: 'retry'): void
}>()
</script>

<template>
  <div class="mb-4 rounded bg-red-100 p-4 text-red-800">
    <p class="font-semibold">Error:</p>
    <p>{{ message }}</p>
    <button
      v-if="showRetry"
      class="mt-3 cursor-pointer rounded bg-red-600 px-3 py-1 text-white transition-colors duration-300 hover:bg-red-700"
      @click="$emit('retry')"
    >
      Retry
    </button>
  </div>
</template>

<style scoped lang="css"></style>
