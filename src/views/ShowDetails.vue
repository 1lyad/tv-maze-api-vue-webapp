<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShowDetails } from '@/composables/useShowDetails'
import { useDynamicBackground } from '@/composables/useDynamicBackground'

import BackButton from '@/components/ui/BackButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import ShowHeader from '@/components/show/ShowHeader.vue'
import ShowInfo from '@/components/show/ShowInfo.vue'
import ShowSeasonsAndEpisodes from '@/components/show/ShowSeasonsAndEpisodes.vue'
import ShowCrew from '@/components/show/ShowCrew.vue'
import ShowCast from '@/components/show/ShowCast.vue'

const route = useRoute()
const initialId = Number(route.params.id)

const { showId, showDetails, loading, error, loadShowDetails } = useShowDetails(initialId)

useDynamicBackground(showDetails)

watch(
  () => route.params.id,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      showId.value = Number(newVal) || 1
      await loadShowDetails()
    }
  },
)

onMounted(() => {
  loadShowDetails()
})
</script>

<template>
  <div class="max-w-full p-4 sm:p-10">
    <Transition>
      <div v-if="loading" class="text-center"></div>
      <ErrorMessage v-else-if="error" :message="error" showRetry @retry="loadShowDetails" />
      <div v-else-if="showDetails">
        <BackButton class="mb-6" />

        <ShowHeader :show="showDetails" class="mb-6">
          <ShowInfo :show="showDetails" class="my-6" />
        </ShowHeader>
        <ShowSeasonsAndEpisodes
          v-if="showDetails._embedded?.episodes?.length"
          :show="showDetails"
          class="mb-6"
        />
        <ShowCast v-if="showDetails._embedded?.cast?.length" :show="showDetails" class="mb-6" />
        <ShowCrew v-if="showDetails._embedded?.crew?.length" :show="showDetails" class="mb-6" />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="css">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
