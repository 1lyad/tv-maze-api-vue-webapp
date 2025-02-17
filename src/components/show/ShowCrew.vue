<script setup lang="ts">
import { computed } from 'vue'
import type { IShowDetails, ICrew } from '@/types/types'
import { NO_AVATAR_URL } from '@/types/constants'

const props = defineProps<{
  show: IShowDetails
}>()

const groupedCrew = computed(() => {
  const crewList = (props?.show._embedded?.crew || []) as ICrew[]

  const map = new Map<number, { person: ICrew['person']; roles: string[] }>()

  for (const c of crewList) {
    const existing = map.get(c.person.id)
    if (!existing) {
      map.set(c.person.id, {
        person: c.person,
        roles: [c.type],
      })
    } else {
      existing.roles.push(c.type)
    }
  }

  return [...map.values()]
})
</script>

<template>
  <div>
    <h2 class="mb-4 text-2xl font-semibold">Crew</h2>

    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="member in groupedCrew"
        :key="member.person.id"
        class="flex items-center space-x-4"
      >
        <img
          :src="member.person.image?.medium || NO_AVATAR_URL"
          :alt="member.person.name"
          class="aspect-square h-16 w-16 rounded-full object-cover"
        />

        <div>
          <div class="font-medium">
            {{ member.person.name }}
          </div>
          <div class="line-clamp-3 text-sm text-gray-500">
            {{ member.roles.join(', ') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css"></style>
