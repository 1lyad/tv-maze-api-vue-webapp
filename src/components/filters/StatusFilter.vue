<script setup lang="ts">
defineProps<{
  selectedStatus: string
  availableStatuses: string[]
}>()

const emits = defineEmits<{
  (e: 'update:selected-status', value: string): void
}>()

/**
 * Handles the change event for the status selection dropdown.
 * Emits an event to update the selected status with the new value.
 *
 * @param e - The change event triggered by the status dropdown.
 */
function onStatusChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  emits('update:selected-status', val)
}
</script>

<template>
  <div class="status-filter space-y-2">
    <h3 class="bg-gray-50 text-xs font-bold text-gray-400 uppercase">Status</h3>
    <select :value="selectedStatus" @change="onStatusChange" class="w-full text-sm outline-none">
      <option value="">All</option>
      <option v-for="status in availableStatuses" :key="status" :value="status">
        {{ status }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="css"></style>
