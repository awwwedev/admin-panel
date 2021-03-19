import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: 'home',
        name: 'admin.home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'realty',
        name: 'admin.realty',
        component: () => import('@/views/Realty/Home.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
