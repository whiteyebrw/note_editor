import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [{ path: '', component: () => import('@/views/IndexView.vue') }],
    },
    {
      path: '/:id',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [{ path: '', component: () => import('@/views/NotesView.vue') }],
    },
  ]
})

export default router
