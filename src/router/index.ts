import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[] = [
  {
    name: 'holleWorld',
    path: '/holle-world',
    component: () => import('@/components/HelloWorld.vue')
  }
]
const router = createRouter({
  history: createWebHistory(), // 路由模式
  routes // 路由规则
})

export default router
