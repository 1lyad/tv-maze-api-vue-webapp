<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IShowDetails } from '@/types/types'
import RatingStars from '@/components/ui/RatingStars.vue'

const props = defineProps<{
  show: IShowDetails
}>()

const openIndex = ref<number | null>(null)

/**
 * Toggle the open state of the group at the given index.
 *
 * @param {number} index - The index of the group to toggle.
 */
function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

const groupedBySeason = computed(() => {
  const episodes = props.show._embedded?.episodes || []
  const groups: Record<number, typeof episodes> = {}

  episodes.forEach((ep) => {
    if (!groups[ep.season]) {
      groups[ep.season] = []
    }
    groups[ep.season].push(ep)
  })

  return Object.entries(groups).map(([season, eps]) => ({
    season: Number(season),
    episodes: eps,
  }))
})
</script>

<template>
  <div>
    <h2 class="mb-4 text-2xl font-semibold">Seasons & Episodes</h2>

    <div class="space-y-2">
      <div v-for="(group, index) in groupedBySeason" :key="group.season">
        <button
          class="hover:text-primary-500 hover:border-primary-500 flex w-full cursor-pointer items-center justify-between border-b border-gray-600 px-4 py-2 text-left transition-colors duration-300"
          @click="toggle(index)"
        >
          <span class="text-xl font-bold">Season {{ group.season }}</span>
          <span
            class="transform transition-transform duration-200"
            :class="{ 'rotate-180': openIndex === index }"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        <transition name="faq">
          <ul
            v-if="openIndex === index"
            class="[&>*:nth-child(odd)]:bg-primary-50/20 list-inside space-y-1 overflow-hidden"
          >
            <li
              v-for="episode in group.episodes"
              :key="episode.id"
              class="flex justify-between border-b border-gray-600 p-4 text-gray-700"
            >
              <div class="flex gap-4">
                <span class="text-2xl font-semibold text-gray-700">{{ episode.number }}</span>
                <div class="flex flex-col gap-0.5 text-base">
                  <span>{{ episode.name }}</span>
                  <RatingStars
                    v-if="episode?.rating?.average"
                    :rating="episode?.rating?.average || 0"
                  />
                </div>
              </div>
              <span>{{ episode.airdate }}</span>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.faq-enter-active,
.faq-leave-active {
  transition:
    opacity 0.3s ease,
    max-height 0.3s ease;
  overflow: hidden;
}

.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  max-height: 0;
}

.faq-enter-to,
.faq-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
