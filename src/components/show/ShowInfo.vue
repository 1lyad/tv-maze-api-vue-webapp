<script setup lang="ts">
import type { IShowDetails } from '@/types/types'
import { computed } from 'vue'

const props = defineProps<{
  show: IShowDetails
}>()

const premieredYear = computed(() => {
  if (!props.show.premiered) return 'N/A'
  const date = new Date(props.show.premiered)
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return formattedDate
})

const endedYear = computed(() => {
  if (!props.show.ended) return 'Present'
  const date = new Date(props.show.ended)
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return formattedDate
})

const totalRuntime = computed(() => {
  if (!props.show?._embedded?.episodes?.[0]?.runtime || !props.show._embedded?.episodes?.length)
    return null
  let totalRuntime = 0
  for (let i = 0; i < props.show._embedded?.episodes?.length; i++) {
    const episode = props.show._embedded?.episodes?.[i]
    totalRuntime += episode?.runtime
  }
  return minToReadable(totalRuntime)
})

/**
 * Converts minutes to a human-readable format.
 *
 * @param {number} time - Total time in minutes.
 * @returns {string} A string in the format "Xh Ym" where X is the number of hours and Y is the number of minutes.
 */
function minToReadable(time: number): string | null {
  if (!time || time < 0) return null

  const days = Math.floor(time / (60 * 24))
  const remainingMinutes = time % (60 * 24)
  const hours = Math.floor(remainingMinutes / 60)
  const minutes = remainingMinutes % 60

  const daysPart = days > 0 ? `${days}d` : ''
  const hoursPart = hours > 0 ? `${hours}h` : ''
  const minutesPart = minutes > 0 ? `${minutes}m` : ''

  return `${daysPart} ${hoursPart} ${minutesPart}`.trim() || '0m'
}
</script>

<template>
  <div>
    <h2 class="mb-4 text-xl font-semibold">Show Info</h2>
    <table class="w-full text-left">
      <tbody
        class="[&>*:nth-child(odd)]:!bg-primary-50/20 divide-y divide-gray-600 text-sm font-semibold"
      >
        <tr>
          <th class="p-2 text-gray-500">Premiered</th>
          <td>{{ premieredYear }}</td>
        </tr>
        <tr>
          <th class="p-2 pr-4 text-gray-500">Ended</th>
          <td>{{ endedYear }}</td>
        </tr>
        <tr v-if="props.show?.network?.country?.name">
          <th class="p-2 text-gray-500">Country</th>
          <td>{{ props.show?.network?.country.name }}</td>
        </tr>
        <tr v-if="props.show?.language">
          <th class="p-2 text-gray-500">Language</th>
          <td>{{ props.show.language }}</td>
        </tr>
        <tr v-if="props.show?.genres.length">
          <th class="p-2 text-gray-500">Genres</th>
          <td>{{ props.show.genres.join(', ') }}</td>
        </tr>
        <tr>
          <th class="p-2 text-gray-500">Status</th>
          <td>{{ props.show.status ?? 'N/A' }}</td>
        </tr>
        <tr v-if="props.show?.runtime">
          <th class="p-2 text-gray-500">Episode Runtime</th>
          <td>{{ props.show.runtime }} min</td>
        </tr>
        <tr v-if="totalRuntime">
          <th class="p-2 text-gray-500">Total Runtime</th>
          <td>{{ totalRuntime }}</td>
        </tr>
        <tr v-if="props.show?.network?.name">
          <th class="p-2 text-gray-500">Network</th>
          <td>{{ props.show.network.name }}</td>
        </tr>
        <tr v-if="props.show?.officialSite">
          <th class="p-2 text-gray-500">Official Site</th>
          <td>
            <a
              :href="props.show.officialSite"
              target="_blank"
              class="text-blue-600 hover:underline"
            >
              Visit
            </a>
          </td>
        </tr>
        <tr v-if="props.show?.externals?.imdb">
          <th class="p-2 text-gray-500">IMDb</th>
          <td>
            <a
              :href="`https://www.imdb.com/title/${props.show.externals.imdb}/`"
              target="_blank"
              class="text-blue-600 hover:underline"
            >
              Visit
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="css"></style>
