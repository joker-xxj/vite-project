import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[] = [
  {
    name: 'hello',
    path: '/',
    component: () => import('@/components/HelloWorld.vue'),
    meta: {
      title: 'hello world',
      key: 'hello'

    }
  },
  {
    name: 'index',
    path: '/index',
    component: () => import('@/views/index.vue'),
    meta: {
      title: 'echarts',
      key: 'index'

    }
  }
]
const router = createRouter({
  history: createWebHistory(), // 路由模式
  routes, // 路由规则
  scrollBehavior: () => ({ left: 0, top: 0 }) // 切换页面，滚动到最顶部
})

export default router
