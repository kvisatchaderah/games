import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/index/index.vue'),
  },
  {
    path: '/index2',
    component: () => import('../views/index2/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
