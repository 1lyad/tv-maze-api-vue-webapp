import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Provides a reactive reference to the current page number and a function to
 * change the page, updating the current page query parameter.
 *
 * @returns An object with the following properties:
 *   - `currentPage`: A reactive reference to the current page number.
 *   - `handlePageChange`: A function to push a new page to the router,
 *     updating the current page query parameter.
 */
export function usePagination() {
  const route = useRoute()
  const router = useRouter()
  const currentPage = ref(Number(route.query.page) || 1)

  watch(
    () => route.query.page,
    (newPage) => {
      currentPage.value = Number(newPage) || 1
    },
  )

  /**
   * Pushes a new page to the router, updating the current page query parameter.
   * @param {number} newPage - The new page number to push.
   */
  function handlePageChange(newPage: number) {
    router.push({ query: { ...route.query, page: newPage } })
  }

  return { currentPage, handlePageChange }
}
