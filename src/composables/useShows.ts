import { ref } from 'vue'
import type { IShow, IShowDetails, IShowSearch } from '@/types/types'

/**
 * A composable function to fetch a list of shows from TVMaze.
 *
 * The function returns an object with three properties:
 *
 * - `shows`: A ref to an array of IShow objects.
 * - `loading`: A ref that is true when the function is fetching shows from the
 *   API.
 * - `error`: A ref that holds any error that occurred while fetching shows.
 * - `fetchShows`: A function that fetches a list of shows from the API. It
 *   takes an optional `page` parameter, which is zero-based.
 * - `fetchShowDetails`: A function that fetches the details of a show from the
 *   API. It takes an `id` parameter and returns a promise that resolves to an
 *   IShowDetails object or null if the show does not exist or there was an
 *   error.
 */
export function useShows() {
  const shows = ref<IShow[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const searchResults = ref<IShowSearch[]>([])

  /**
   * Fetches a list of shows from TVMaze.
   *
   * @param {number} [page=0] - The page of shows to fetch. The page parameter is
   * zero-based, so the first page is actually page 0.
   *
   * @returns {Promise<void>}
   */
  async function fetchShows(page: number = 0) {
    page--
    try {
      loading.value = true
      const response = await fetch(`https://api.tvmaze.com/shows?page=${page}`)
      const data = await response.json()
      shows.value = data
    } catch (err: unknown) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetches the details of a show, including all episodes, cast, seasons,
   * crew, akas and images.
   *
   * @param {number} id - The id of the show to fetch.
   * @return {Promise<IShowDetails | null>} A promise that resolves to the
   * show details object, or null if the show does not exist or there was an
   * error.
   */
  async function fetchShowDetails(id: number): Promise<IShowDetails | null> {
    try {
      const response = await fetch(
        `https://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=cast&embed[]=seasons&embed[]=crew&embed[]=akas&embed[]=images`,
      )
      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`Error fetching show details: ${response.status}`)
      }
      const data = await response.json()
      return data as IShowDetails
    } catch (err: unknown) {
      console.error(err)
      throw err
    }
  }

  /**
   * Searches for shows by name.
   *
   * @param {string} query - The search query.
   * @returns {Promise<void>}
   */
  async function searchShows(query: string): Promise<void> {
    if (!query.trim()) {
      // If query is empty, clear search results
      searchResults.value = []
      return
    }

    try {
      loading.value = true
      error.value = null
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
      )
      if (!response.ok) {
        throw new Error(`Error searching shows: ${response.status}`)
      }
      const data = await response.json() // Array of { score, show }
      searchResults.value = data // typed as IShowSearch[]
    } catch (err: unknown) {
      error.value = err as Error
      searchResults.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    shows,
    loading,
    error,
    fetchShows,
    fetchShowDetails,
    searchShows,
    searchResults,
  }
}
