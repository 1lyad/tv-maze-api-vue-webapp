import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShows } from '@/composables/useShows'
import type { IShowDetails } from '@/types/types'
import { FILTER_DEFAULTS } from '@/types/constants'

export function useShowDetails(initialId: number) {
  const router = useRouter()
  const showId = ref(initialId)
  const showDetails = ref<IShowDetails | null>(null)
  const loading = ref(true)
  const error = ref('')

  const { fetchShowDetails } = useShows()

  /**
   * Fetches the show details from the API and stores them in the `showDetails` ref.
   * - If the response is 404 => returns null => we pick a random ID and retry (up to 5 times).
   * - If the response is a non-404 error => set `error.value` and stop retrying.
   */
  async function loadShowDetails() {
    loading.value = true
    error.value = ''
    const maxAttempts = 5
    let attempts = 0
    let details: IShowDetails | null = null

    while (attempts < maxAttempts && !details) {
      try {
        const result = await fetchShowDetails(showId.value)
        if (result === null) {
          // Means a 404. We'll pick a new random ID and try again.
          const randomNumber = Math.floor(Math.random() * FILTER_DEFAULTS.TOTAL_SHOWS) + 1
          showId.value = randomNumber
          router.replace(`/shows/${randomNumber}`)
        } else {
          // We got a valid show
          details = result
        }
      } catch (err: unknown) {
        // Non-404 error (like 429, 500, or a network error).
        // Stop retrying and show an error message to the user.
        if (err instanceof Error) {
          error.value = err.message || 'Error fetching show details.'
        } else {
          error.value = 'Unknown error occurred.'
        }
        break
      }
      attempts++
    }

    if (details) {
      showDetails.value = details
    } else if (!error.value) {
      // If we still don't have details but no non-404 error,
      // it means we had repeated 404s.
      error.value = 'Show details not found after several attempts.'
    }

    loading.value = false
  }

  return { showId, showDetails, loading, error, loadShowDetails }
}
