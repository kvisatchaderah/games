import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import use_component_routes from './component_routes/use_component_routes'

const routes: RouteRecordRaw[] = [...use_component_routes()]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: '--active',
  routes,
})

export default router
