import { ref, computed, type Ref } from 'vue'
import type { IShow, SortOption } from '@/types/types'
import { SORT_OPTIONS, FILTER_DEFAULTS } from '@/types/constants'

/**
 * Composable function to filter and sort a list of TV shows based on user-selected criteria.
 *
 * The function provides reactive references to selected filter options and computes
 * filtered and sorted subsets of shows. It includes the following properties and methods:
 *
 * - `selectedGenres`: Reactive ref of an array of selected genres.
 * - `selectedYear`: Reactive ref for the selected year.
 * - `selectedStatus`: Reactive ref for the selected status of the show.
 * - `minRating`: Reactive ref for the minimum rating filter.
 * - `sortOption`: Reactive ref for the selected sort option.
 * - `filteredShows`: Computed ref returning the list of shows filtered and sorted based on
 *   the selected criteria.
 * - `availableGenres`: Computed ref returning the list of available genres from the filtered
 *   shows, sorted by frequency.
 * - `availableYears`: Computed ref returning the list of available years from the filtered
 *   shows, sorted in descending order.
 * - `availableStatuses`: Computed ref returning the list of available statuses from the
 *   filtered shows, sorted alphabetically.
 *
 * @param {Ref<IShow[]>} allShows - A reactive reference to the list of all available shows.
 * @returns An object containing reactive references and computed properties for filtering and
 * sorting shows.
 */

export function useShowsFilter(allShows: Ref<IShow[]>) {
  const selectedGenres = ref<string[]>([])
  const selectedYear = ref<string>('')
  const selectedStatus = ref<string>('')
  const minRating = ref<number>(FILTER_DEFAULTS.MIN_RATING)
  const sortOption = ref<SortOption>(FILTER_DEFAULTS.DEFAULT_SORT)

  const filteredShows = computed<IShow[]>(() => {
    let result = [...allShows.value]

    if (selectedGenres.value.length > 0) {
      result = result.filter((show) => selectedGenres.value.every((g) => show.genres.includes(g)))
    }
    if (selectedYear.value) {
      result = result.filter((show) => show.premiered?.slice(0, 4) === selectedYear.value)
    }
    if (selectedStatus.value) {
      result = result.filter((show) => show.status === selectedStatus.value)
    }
    result = result.filter((show) => {
      const avg = show.rating?.average ?? 0
      return avg >= minRating.value
    })
    switch (sortOption.value) {
      case SORT_OPTIONS.RATING_DESC:
        result.sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
        break
      case SORT_OPTIONS.RATING_ASC:
        result.sort((a, b) => (a.rating?.average ?? 0) - (b.rating?.average ?? 0))
        break
      case SORT_OPTIONS.ALPHA_ASC:
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case SORT_OPTIONS.ALPHA_DESC:
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
    }
    return result
  })

  /**
   * Compute a subset of shows that matches the filters selected by the user,
   * excluding genres.
   *
   * @returns An array of shows that match the user's selected year, status, and
   * minimum rating.
   */
  function computeShowsIgnoringGenres(): IShow[] {
    let subset = [...allShows.value]
    if (selectedYear.value) {
      subset = subset.filter((show) => show.premiered?.slice(0, 4) === selectedYear.value)
    }
    if (selectedStatus.value) {
      subset = subset.filter((show) => show.status === selectedStatus.value)
    }
    subset = subset.filter((show) => {
      const avg = show.rating?.average ?? 0
      return avg >= minRating.value
    })
    return subset
  }

  const availableGenres = computed(() => {
    let subset = computeShowsIgnoringGenres()
    if (selectedGenres.value.length > 0) {
      subset = subset.filter((show) => selectedGenres.value.every((g) => show.genres.includes(g)))
    }
    const genreCountMap: Record<string, number> = {}
    for (const show of subset) {
      for (const g of show.genres) {
        genreCountMap[g] = (genreCountMap[g] || 0) + 1
      }
    }
    const arr = Object.entries(genreCountMap).map(([genre, count]) => ({ genre, count }))
    arr.sort((a, b) => b.count - a.count)
    return arr
  })

  const availableYears = computed(() => {
    let subset = [...allShows.value]
    if (selectedGenres.value.length > 0) {
      subset = subset.filter((show) => selectedGenres.value.every((g) => show.genres.includes(g)))
    }
    if (selectedStatus.value) {
      subset = subset.filter((show) => show.status === selectedStatus.value)
    }
    subset = subset.filter((show) => {
      const avg = show.rating?.average ?? 0
      return avg >= minRating.value
    })
    const yearSet = new Set<string>()
    for (const show of subset) {
      if (show.premiered) {
        yearSet.add(show.premiered.slice(0, 4))
      }
    }
    return [...yearSet].sort().reverse()
  })

  const availableStatuses = computed(() => {
    let subset = [...allShows.value]
    if (selectedGenres.value.length > 0) {
      subset = subset.filter((show) => selectedGenres.value.every((g) => show.genres.includes(g)))
    }
    if (selectedYear.value) {
      subset = subset.filter((show) => show.premiered?.slice(0, 4) === selectedYear.value)
    }
    subset = subset.filter((show) => {
      const avg = show.rating?.average ?? 0
      return avg >= minRating.value
    })
    const statusSet = new Set<string>()
    for (const show of subset) {
      if (show.status) {
        statusSet.add(show.status)
      }
    }
    return [...statusSet].sort()
  })

  return {
    selectedGenres,
    selectedYear,
    selectedStatus,
    minRating,
    sortOption,
    filteredShows,
    availableGenres,
    availableYears,
    availableStatuses,
  }
}
