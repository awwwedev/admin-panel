import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('@/components/Login.vue')
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
        component: () => import('@/views/Realty/Index.vue')
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
      },
      {
        name: 'admin.equipment',
        path: 'equipment',
        component: () => import('@/views/Equipment/Index.vue')
      },
      {
        name: 'admin.equipment.create',
        path: 'equipment/create',
        meta: {
          isCreatePage: true
        },
        component: () => import('@/views/Equipment/Constructor.vue')
      },
      {
        name: 'admin.equipment.change',
        path: 'equipment/:id/change',
        meta: {
          isCreatePage: false
        },
        component: () => import('@/views/Equipment/Constructor.vue')
      },
      {
        name: 'admin.slide',
        path: 'slide',
        component: () => import('@/views/Slide/Index.vue')
      },
      {
        name: 'admin.slide.create',
        path: 'slide/create',
        meta: {
          isCreatePage: true
        },
        component: () => import('@/views/Slide/Constructor.vue')
      },
      {
        name: 'admin.slide.change',
        path: 'slide/:id/change',
        meta: {
          isCreatePage: false
        },
        component: () => import('@/views/Slide/Constructor.vue')
      },
      {
        name: 'admin.contact',
        path: 'contact',
        component: () => import('@/views/Contact/Index.vue')
      },
      {
        name: 'admin.contact.create',
        path: 'contact/create',
        meta: {
          isCreatePage: true
        },
        component: () => import('@/views/Contact/Constructor.vue')
      },
      {
        name: 'admin.contact.change',
        path: 'contact/:id/change',
        meta: {
          isCreatePage: false
        },
        component: () => import('@/views/Contact/Constructor.vue')
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
