<script setup lang="ts">
import type { IShow } from '@/types/types'
import { useRouter } from 'vue-router'
import RatingStars from '@/components/ui/RatingStars.vue'
import { NO_POSTER_URL } from '@/types/constants'

defineProps<{
  shows: IShow[]
}>()

const router = useRouter()

/**
 * Navigate to a show's page.
 *
 * @param {number} id - The id of the show.
 */
function goToShow(id: number) {
  if (!id) return
  router.push(`/shows/${id}`)
}
</script>

<template>
  <div class="relative flex-1 overflow-x-auto">
    <table class="w-full text-left text-sm rtl:text-right">
      <thead class="border-primary-300 border-b bg-gray-50 text-xs text-gray-400 uppercase">
        <tr>
          <th scope="col" class="p-2 pl-3 sm:px-6 sm:py-3">Name</th>
          <th scope="col" class="p-2 sm:px-6 sm:py-3">Status</th>
          <th scope="col" class="p-2 pr-3 sm:px-6 sm:py-3">Year</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="show in shows"
          :key="show.id"
          @click="goToShow(show.id)"
          class="hover:bg-primary-50 cursor-pointer border-b border-gray-200 bg-white transition-colors duration-300"
        >
          <td
            scope="row"
            class="flex items-center p-2 pl-3 whitespace-break-spaces sm:px-6 sm:py-4 sm:whitespace-nowrap"
          >
            <img
              class="h-14 w-10 object-cover"
              :src="show?.image?.medium || NO_POSTER_URL"
              loading="lazy"
              :alt="show?.name || 'N/A'"
            />
            <div class="ps-3">
              <div class="flex flex-col gap-1 text-base font-semibold">
                <RouterLink
                  v-if="show?.id"
                  :to="{
                    name: 'show-details',
                    params: { id: show?.id },
                  }"
                  class="font-medium text-blue-600 hover:underline"
                >
                  {{ show?.name || 'N/A' }}
                </RouterLink>
                <span v-else> {{ show?.name || 'N/A' }}</span>
                <RatingStars :rating="show?.rating?.average || 0" />
              </div>
            </div>
          </td>
          <td class="p-2 text-base sm:px-6 sm:py-4">{{ show?.status || 'N/A' }}</td>
          <td class="p-2 pr-3 text-base sm:px-6 sm:py-4">
            {{ show?.premiered?.slice(0, 4) || 'N/A' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="css"></style>
