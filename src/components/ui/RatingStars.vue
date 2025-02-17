<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  rating: number
  starCount?: number
}>()

const totalStars = props.starCount || 5

const normalizedRating = computed(() => {
  const safeRating = Math.max(0, Math.min(props.rating, 10))
  return safeRating / (10 / totalStars)
})

const starFillLevels = computed(() =>
  Array.from({ length: totalStars }, (_, index) =>
    Math.min(1, Math.max(0, normalizedRating.value - index)),
  ),
)

const getPartialStarStyle = (fill: number) => {
  if (fill > 0 && fill < 1) {
    const percent = fill * 100
    return {
      background: `linear-gradient(90deg, #ffb400 0%, #ffb400 ${percent}%, #99a1af ${percent}%, #99a1af 100%)`,
    }
  }
  return {}
}
</script>

<template>
  <div class="star-rating" :title="`Rating: ${props.rating}/10`">
    <div class="star-rating__wrapper">
      <div
        v-for="(fill, index) in starFillLevels"
        :key="index"
        class="star-rating__star"
        :class="{ 'star-rating__star--full': fill === 1 }"
        :style="getPartialStarStyle(fill)"
      ></div>
    </div>
    <span class="text-xs font-bold text-gray-400">{{ props.rating }} / 10</span>
  </div>
</template>

<style scoped lang="css">
.star-rating {
  display: inline-block;
}

.star-rating__wrapper {
  display: flex;
}

.star-rating__star {
  margin: 0 2px;
  width: 18px;
  height: 16px;
  background: #99a1af;
  clip-path: polygon(
    50% 3%,
    61% 38%,
    98% 38%,
    68% 60%,
    79% 94%,
    50% 73%,
    21% 94%,
    32% 60%,
    2% 38%,
    39% 38%
  );
}

.star-rating__star--full {
  background: #ffb400;
}
</style>
