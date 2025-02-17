<script setup lang="ts">
import type { SortOption } from '@/types/types'

defineProps<{
  sortOption: SortOption
}>()

const emits = defineEmits<{
  (e: 'update:sort-option', value: SortOption): void
}>()

/**
 * Handles the change event for the sort option dropdown.
 * Emits an event to update the selected sort option with the new value.
 *
 * @param e - The change event triggered by the sort option dropdown.
 */
function onSortChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value as SortOption
  emits('update:sort-option', val)
}
</script>

<template>
  <div class="sort-filter space-y-2">
    <h3 class="bg-gray-50 text-xs font-bold text-gray-400 uppercase">Sort By</h3>
    <select :value="sortOption" @change="onSortChange" class="w-full text-sm outline-none">
      <option value="ratingDesc">Rating (High to Low)</option>
      <option value="ratingAsc">Rating (Low to High)</option>
      <option value="alphaAsc">Alphabetical (A-Z)</option>
      <option value="alphaDesc">Alphabetical (Z-A)</option>
    </select>
  </div>
</template>

<style scoped lang="css"></style>
