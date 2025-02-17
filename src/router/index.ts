import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      props: (route) => ({ page: Number(route.query.page) || 1 }),
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/shows/:id',
      name: 'show-details',
      component: () => import('@/views/ShowDetails.vue'),
    },
  ],
})

export default router
