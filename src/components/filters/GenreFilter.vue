<script setup lang="ts">
import { ref, computed } from 'vue'

interface GenreCount {
  genre: string
  count: number
}

const props = defineProps<{
  selectedGenres: string[]
  availableGenres: GenreCount[]
}>()

const emits = defineEmits<{
  (e: 'update:selected-genres', value: string[]): void
}>()

const genreSearch = ref('')
const isExpanded = ref(false)
const limit = 5

const filteredGenres = computed(() => {
  const q = genreSearch.value.toLowerCase()
  return props.availableGenres.filter((g) => g.genre.toLowerCase().includes(q))
})

const visibleGenres = computed(() => {
  if (!isExpanded.value) {
    return filteredGenres.value.slice(0, limit)
  }
  return [...filteredGenres.value].sort((a, b) => a.genre.localeCompare(b.genre))
})

/**
 * Toggle the expansion of the genre list. If the list is expanded, collapse it to the first 5
 * items. If the list is collapsed, expand it to show all items.
 */
function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

/**
 * Checks if a genre is currently selected.
 *
 * @param genre - The genre to check.
 * @returns A boolean indicating whether the genre is in the selected list.
 */

function isSelected(genre: string) {
  return props.selectedGenres.includes(genre)
}

/**
 * Toggle a genre in the selected list.
 *
 * If the genre is already selected, it is removed from the list.
 * If the genre is not selected, it is added to the list.
 *
 * Emits an event to update the selected genres with the new list.
 *
 * @param genre - The genre to toggle.
 */
function toggleGenre(genre: string) {
  const newGenres = [...props.selectedGenres]
  const idx = newGenres.indexOf(genre)
  if (idx >= 0) {
    newGenres.splice(idx, 1)
  } else {
    newGenres.push(genre)
  }
  emits('update:selected-genres', newGenres)
}
</script>

<template>
  <div class="genre-filter space-y-2">
    <h3 class="bg-gray-50 text-xs font-bold text-gray-400 uppercase">Genres</h3>
    <input
      v-model="genreSearch"
      type="text"
      placeholder="Search genres..."
      class="search-input w-full text-sm outline-none"
    />
    <ul class="m-0 max-h-80 list-none overflow-y-auto p-0 text-sm">
      <li
        v-for="item in visibleGenres"
        :key="item.genre"
        class="hover:bg-primary-50 mr-2 flex cursor-pointer justify-between p-2 transition-colors duration-300"
        :class="isSelected(item.genre) ? 'bg-primary-100 font-bold' : ''"
        @click="toggleGenre(item.genre)"
      >
        <span>{{ item.genre }}</span>
        <span class="genre-count">({{ item.count }})</span>
      </li>
    </ul>
    <button
      v-if="filteredGenres.length > limit"
      class="text-primary-600 hover:text-primary-300 cursor-pointer pl-2 text-center text-sm transition-colors duration-300 hover:underline"
      @click="toggleExpand"
    >
      {{ isExpanded ? 'Collapse' : 'Show All' }}
    </button>
  </div>
</template>

<style scoped lang="css">
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
