<script setup lang="ts">
import debounce from 'lodash/debounce'

defineProps<{
  minRating: number
}>()

const emits = defineEmits<{
  (e: 'update:min-rating', value: number): void
}>()

const debouncedEmit = debounce((value: number) => {
  emits('update:min-rating', value)
}, 50)

/**
 * Handles the change event for the minimum rating input.
 * Converts the input value to a float, then emits an event to update the minimum rating
 * with the new value, after a short delay to prevent excessive updates.
 *
 * @param e - The change event triggered by the minimum rating input.
 */
function onRatingChange(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value)
  debouncedEmit(val)
}
</script>

<template>
  <div class="rating-filter space-y-2">
    <h3 class="bg-gray-50 text-xs font-bold text-gray-400 uppercase">Minimum Rating</h3>
    <div class="relative mb-6">
      <input
        type="range"
        min="0"
        max="10"
        step="0.1"
        :value="minRating"
        @input="onRatingChange"
        class="range accent-primary-400 w-full cursor-pointer appearance-none text-sm transition-colors duration-300 outline-none"
      />
      <span class="absolute end-1/2 -bottom-6 text-sm text-gray-500">{{ minRating }}</span>
    </div>
  </div>
</template>

<style scoped lang="css"></style>
