<script setup lang="ts">
import { ref, watch } from 'vue'
import debounce from 'lodash/debounce'

const props = defineProps<{
  searchQuery: string
}>()

const emits = defineEmits<{
  (e: 'update:searchQuery', val: string): void
}>()

const localValue = ref(props.searchQuery)

const debouncedEmit = debounce((val: string) => {
  emits('update:searchQuery', val)
}, 350)

watch(localValue, (newVal) => {
  debouncedEmit(newVal)
})

watch(
  () => props.searchQuery,
  (newVal) => {
    localValue.value = newVal
  },
)
</script>

<template>
  <div class="flex flex-col bg-gray-50 p-4 sm:pt-8 sm:pl-8">
    <h3 class="mb-2 ml-2 bg-gray-50 text-xs font-bold text-gray-400 uppercase">Search</h3>
    <input
      type="text"
      class="w-full rounded bg-gray-50 px-2 py-1"
      placeholder="Search for a show..."
      v-model="localValue"
    />
  </div>
</template>

<style scoped lang="css"></style>
