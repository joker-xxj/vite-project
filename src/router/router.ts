import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// * 导入所有router
const metaRouters = import.meta.globEager('./modules/*.ts')

// * 处理路由表
export const routerArray: RouteRecordRaw[] = []
Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key])
  })
})
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
  ...routerArray,
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
