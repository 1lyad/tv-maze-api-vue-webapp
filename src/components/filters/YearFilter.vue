<script setup lang="ts">
defineProps<{
  selectedYear: string
  availableYears: string[]
}>()

const emits = defineEmits<{
  (e: 'update:selected-year', value: string): void
}>()

/**
 * Handles the change event for the year selection dropdown.
 * Emits an event to update the selected year with the new value.
 *
 * @param e - The change event triggered by the year dropdown.
 */

function onYearChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  emits('update:selected-year', val)
}
</script>

<template>
  <div class="year-filter space-y-2">
    <h3 class="bg-gray-50 text-xs font-bold text-gray-400 uppercase">Year</h3>
    <select :value="selectedYear" @change="onYearChange" class="w-full text-sm outline-none">
      <option value="">All</option>
      <option v-for="year in availableYears" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="css"></style>
