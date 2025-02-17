<script setup lang="ts">
import { onMounted, watch, ref, computed } from 'vue'
import { useShows } from '@/composables/useShows'
import { usePagination } from '@/composables/usePagination'
import { useShowsFilter } from '@/composables/useShowsFilter'

import SearchBox from '@/components/filters/SearchBox.vue'
import FilterPanel from '@/components/filters/FilterPanel.vue'
import ShowsList from '@/components/show/ShowsList.vue'
import PaginationFilter from '@/components/filters/PaginationFilter.vue'
import { FILTER_DEFAULTS } from '@/types/constants'
import type { IShow } from '@/types/types'

const { shows: allShows, fetchShows, searchShows, searchResults, loading, error } = useShows()
const { currentPage, handlePageChange } = usePagination()

defineProps<{
  page: number
}>()

onMounted(() => {
  fetchShows(currentPage.value)
})
watch(currentPage, (newPage) => {
  if (!searchQuery.value.trim()) {
    fetchShows(newPage)
  }
})

const searchQuery = ref('')
watch(searchQuery, (newVal) => {
  if (newVal.trim()) {
    searchShows(newVal.trim())
  } else {
    fetchShows(currentPage.value)
  }
})

const baseArray = computed<IShow[]>(() => {
  if (searchQuery.value.trim()) {
    return searchResults.value.map((r) => r.show)
  } else {
    return allShows.value
  }
})

const {
  selectedGenres,
  selectedYear,
  selectedStatus,
  minRating,
  sortOption,
  filteredShows,
  availableGenres,
  availableYears,
  availableStatuses,
} = useShowsFilter(baseArray)

const showFilterPanel = ref(false)
function toggleFilterPanel() {
  showFilterPanel.value = !showFilterPanel.value
}

watch(currentPage, () => {
  selectedGenres.value = []
  selectedYear.value = ''
  selectedStatus.value = ''
  minRating.value = FILTER_DEFAULTS.MIN_RATING
})
</script>

<template>
  <div>
    <SearchBox v-model:searchQuery="searchQuery" />
  </div>

  <div v-if="loading" class="p-4 text-gray-500">Loading...</div>
  <div v-else-if="error" class="p-4 text-red-500">
    {{ error.message }}
  </div>
  <div v-else class="flex flex-col md:flex-row">
    <div class="bg-gray-50 p-6 pt-0 md:hidden">
      <button
        @click="toggleFilterPanel"
        class="bg-primary-200 w-full px-4 py-2 font-semibold text-gray-900"
      >
        {{ showFilterPanel ? 'Hide Filters' : 'Show Filters' }}
      </button>
    </div>

    <aside class="hidden w-60 min-w-72 bg-gray-50 md:sticky md:top-0 md:block md:h-screen">
      <FilterPanel
        :selected-genres="selectedGenres"
        :available-genres="availableGenres"
        :selected-year="selectedYear"
        :available-years="availableYears"
        :selected-status="selectedStatus"
        :available-statuses="availableStatuses"
        :min-rating="minRating"
        :sort-option="sortOption"
        :currentPage="currentPage"
        :total-pages="FILTER_DEFAULTS.TOTAL_PAGES"
        :is-pagination-shown="!searchQuery.trim()"
        @update:selected-genres="selectedGenres = $event"
        @update:selected-year="selectedYear = $event"
        @update:selected-status="selectedStatus = $event"
        @update:min-rating="minRating = $event"
        @update:sort-option="sortOption = $event"
        @pageChanged="handlePageChange"
      />
    </aside>

    <div class="block md:hidden" v-if="showFilterPanel">
      <FilterPanel
        :selected-genres="selectedGenres"
        :available-genres="availableGenres"
        :selected-year="selectedYear"
        :available-years="availableYears"
        :selected-status="selectedStatus"
        :available-statuses="availableStatuses"
        :min-rating="minRating"
        :sort-option="sortOption"
        :currentPage="currentPage"
        :total-pages="FILTER_DEFAULTS.TOTAL_PAGES"
        :is-pagination-shown="!searchQuery.trim()"
        @update:selected-genres="selectedGenres = $event"
        @update:selected-year="selectedYear = $event"
        @update:selected-status="selectedStatus = $event"
        @update:min-rating="minRating = $event"
        @update:sort-option="sortOption = $event"
        @pageChanged="handlePageChange"
      />
    </div>

    <div class="flex-1">
      <ShowsList :shows="filteredShows" />

      <PaginationFilter
        v-if="!searchQuery.trim()"
        class="!mt-0 !py-6"
        :currentPage="currentPage"
        :totalPages="FILTER_DEFAULTS.TOTAL_PAGES"
        @pageChanged="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped lang="css"></style>
