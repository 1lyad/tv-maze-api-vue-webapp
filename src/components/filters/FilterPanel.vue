<script setup lang="ts">
import YearFilter from './YearFilter.vue'
import StatusFilter from './StatusFilter.vue'
import RatingFilter from './RatingFilter.vue'
import SortFilter from './SortFilter.vue'
import GenreFilter from './GenreFilter.vue'
import PaginationFilter from './PaginationFilter.vue'
import type { SortOption } from '@/types/types'

defineProps<{
  selectedGenres: string[]
  availableGenres: { genre: string; count: number }[]
  selectedYear: string
  availableYears: string[]
  selectedStatus: string
  availableStatuses: string[]
  minRating: number
  sortOption: SortOption
  currentPage: number
  totalPages: number
  isPaginationShown: boolean
}>()

defineEmits<{
  (e: 'update:selected-genres', value: string[]): void
  (e: 'update:selected-year', value: string): void
  (e: 'update:selected-status', value: string): void
  (e: 'update:min-rating', value: number): void
  (e: 'update:sort-option', value: SortOption): void
  (e: 'pageChanged', value: number): void
}>()
</script>

<template>
  <div class="flex flex-col gap-6 bg-gray-50 p-2 sm:p-10 sm:!pt-0">
    <GenreFilter
      :selected-genres="selectedGenres"
      :available-genres="availableGenres"
      @update:selected-genres="$emit('update:selected-genres', $event)"
    />
    <YearFilter
      :selected-year="selectedYear"
      :available-years="availableYears"
      @update:selected-year="$emit('update:selected-year', $event)"
    />
    <StatusFilter
      :selected-status="selectedStatus"
      :available-statuses="availableStatuses"
      @update:selected-status="$emit('update:selected-status', $event)"
    />
    <RatingFilter :min-rating="minRating" @update:min-rating="$emit('update:min-rating', $event)" />
    <SortFilter
      :sort-option="sortOption"
      @update:sort-option="$emit('update:sort-option', $event)"
    />
    <PaginationFilter
      v-if="isPaginationShown"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @pageChanged="$emit('pageChanged', $event)"
    />
  </div>
</template>

<style scoped lang="css"></style>
