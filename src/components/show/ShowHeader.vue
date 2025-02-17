<script setup lang="ts">
import type { IShowDetails } from '@/types/types'
import { computed } from 'vue'
import RatingStars from '@/components/ui/RatingStars.vue'
import { NO_POSTER_URL } from '@/types/constants'
const props = defineProps<{
  show: IShowDetails
}>()

const poster = computed(
  () => props.show.image?.original || props.show.image?.medium || NO_POSTER_URL,
)
</script>

<template>
  <div class="flex flex-col gap-6 md:flex-row">
    <div class="md:w-1/3">
      <img v-if="poster" :src="poster" :alt="props.show.name" class="h-auto w-full object-cover" />
    </div>

    <div class="md:w-2/3">
      <h1 class="mb-0.5 text-3xl font-bold">{{ props.show.name ?? 'N/A' }}</h1>
      <h2 v-if="props.show.premiered" class="mb-2 text-xl font-bold">
        {{
          `${props.show.premiered.split('-')[0]} - ${props.show.ended?.split('-')[0] ?? 'Present'}`
        }}
      </h2>

      <div class="mb-4 flex flex-col items-start font-semibold text-gray-400">
        <RatingStars v-if="props.show.rating?.average" :rating="props.show.rating?.average || 0" />
      </div>

      <div class="leading-relaxed text-gray-800" v-html="props.show.summary"></div>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="css"></style>
