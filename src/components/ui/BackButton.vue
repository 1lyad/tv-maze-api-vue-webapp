<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const props = defineProps({
  fallbackRoute: {
    type: String,
    default: '/',
  },
  text: {
    type: String,
    default: '← Go Back',
  },
})

const router = useRouter()
const canGoBack = ref(false)

onMounted(() => {
  canGoBack.value = window.history.state?.back || false
})

const handleBack = () => {
  if (canGoBack.value) {
    router.back()
  } else {
    router.push(props.fallbackRoute)
  }
}
</script>

<template>
  <button
    @click="handleBack"
    class="hover:bg-primary-50 inline-flex cursor-pointer items-center px-4 py-2 text-xs text-gray-700 transition-colors duration-300"
  >
    {{ text }}
  </button>
</template>
