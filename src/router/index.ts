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
      },
      {
        path: 'realty/new',
        name: 'admin.realty.create',
        meta: {
          isCreatePage: true
        },
        component: () => import('@/views/Realty/Constructor.vue')
      },
      {
        path: 'realty/:id/change',
        name: 'admin.realty.change',
        meta: {
          isCreatePage: false
        },
        component: () => import('@/views/Realty/Constructor.vue')
      },
      {
        name: 'admin.realtyType',
        path: 'realty-type',
        component: () => import('@/views/RealtyType/Index.vue')
      },
      {
        name: 'admin.realtyType.create',
        path: 'realty-type/create',
        meta: {
          isCreatePage: true
        },
        component: () => import('@/views/RealtyType/Constructor.vue')
      },
      {
        name: 'admin.realtyType.change',
        path: 'realty-type/:id/change',
        meta: {
          isCreatePage: false
        },
        component: () => import('@/views/RealtyType/Constructor.vue')
      },
      {
        name: 'admin.news',
        path: 'news',
        component: () => import('@/views/News/Index.vue')
      },
      {
        name: 'admin.news.create',
        path: 'news/create',
        meta: {
          isCreatePage: true
        },
        component: () => import('@/views/News/Constructor.vue')
      },
      {
        name: 'admin.news.change',
        path: 'news/:id/change',
        meta: {
          isCreatePage: false
        },
        component: () => import('@/views/News/Constructor.vue')
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
