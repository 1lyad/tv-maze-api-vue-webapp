<script setup lang="ts">
import type { ICast, IShowDetails, IPerson } from '@/types/types'
import { computed } from 'vue'
import { NO_AVATAR_URL } from '@/types/constants'

const props = defineProps<{
  show: IShowDetails
}>()

/**
 * Returns the image URL for a given person (or a fallback).
 */
function getImageUrl(person: IPerson) {
  return person.image?.medium ?? NO_AVATAR_URL
}

/**
 * Groups cast members by their person.id.
 * Each entry has:
 *   - person: the cast member's person object
 *   - characters: an array of string names (e.g. ['Rick', 'Morty'])
 */
const groupedCast = computed(() => {
  const castList = props.show._embedded?.cast || []

  const map = new Map<number, { person: ICast['person']; characters: string[] }>()

  for (const c of castList) {
    const existing = map.get(c.person.id)
    if (!existing) {
      map.set(c.person.id, {
        person: c.person,
        characters: [c.character.name],
      })
    } else {
      existing.characters.push(c.character.name)
    }
  }

  return [...map.values()]
})
</script>

<template>
  <div>
    <h2 class="mb-4 text-2xl font-semibold">Cast</h2>
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="castMember in groupedCast"
        :key="castMember.person.id"
        class="flex items-center space-x-4"
      >
        <img
          :src="getImageUrl(castMember.person)"
          :alt="castMember.person.name"
          class="aspect-square h-16 w-16 rounded-full object-cover"
        />
        <div>
          <div class="font-medium">
            {{ castMember.person.name }}
          </div>
          <div class="line-clamp-3 text-sm text-gray-500">
            as {{ castMember.characters.join(', ') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css"></style>
