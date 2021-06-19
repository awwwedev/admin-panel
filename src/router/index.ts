import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import PathThrough from "@/components/PathThrough.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '',
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: 'home',
        name: 'admin.home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'realty',
        component: PathThrough,
        children: [
          {
            name: 'admin.realty',
            path: '',
            component: () => import('@/views/Realty/Index.vue')
          },
          {
            path: 'new',
            name: 'admin.realty.create',
            meta: {
              isCreatePage: true
            },
            component: () => import('@/views/Realty/Constructor.vue')
          },
          {
            path: ':id/change',
            name: 'admin.realty.change',
            meta: {
              isCreatePage: false
            },
            component: () => import('@/views/Realty/Constructor.vue')
          },
        ]
      },
      {
        path: 'realty-type',
        component: PathThrough,
        children: [
          {
            name: 'admin.realtyType',
            path: '',
            component: () => import('@/views/RealtyType/Index.vue')
          },
          {
            name: 'admin.realtyType.create',
            path: 'create',
            meta: {
              isCreatePage: true
            },
            component: () => import('@/views/RealtyType/Constructor.vue')
          },
          {
            name: 'admin.realtyType.change',
            path: ':id/change',
            meta: {
              isCreatePage: false
            },
            component: () => import('@/views/RealtyType/Constructor.vue')
          },
        ]
      },
      {
        path: 'news',
        component: PathThrough,
        children: [
          {
            name: 'admin.news',
            path: '',
            component: () => import('@/views/News/Index.vue')
          },
          {
            name: 'admin.news.create',
            path: 'create',
            meta: {
              isCreatePage: true
            },
            component: () => import('@/views/News/Constructor.vue')
          },
          {
            name: 'admin.news.change',
            path: ':id/change',
            meta: {
              isCreatePage: false
            },
            component: () => import('@/views/News/Constructor.vue')
          },
        ]
      },
      {
        path: 'equipment',
        component: PathThrough,
        children: [
          {
            name: 'admin.equipment',
            path: '',
            component: () => import('@/views/Equipment/Index.vue')
          },
          {
            name: 'admin.equipment.create',
            path: 'create',
            meta: {
              isCreatePage: true
            },
            component: () => import('@/views/Equipment/Constructor.vue')
          },
          {
            name: 'admin.equipment.change',
            path: ':id/change',
            meta: {
              isCreatePage: false
            },
            component: () => import('@/views/Equipment/Constructor.vue')
          },
        ]
      },
      {
        path: 'slide',
        component: PathThrough,
        children: [
          {
            name: 'admin.slide',
            path: '',
            component: () => import('@/views/Slide/Index.vue')
          },
          {
            name: 'admin.slide.create',
            path: 'create',
            meta: {
              isCreatePage: true
            },
            component: () => import('@/views/Slide/Constructor.vue')
          },
          {
            name: 'admin.slide.change',
            path: ':id/change',
            meta: {
              isCreatePage: false
            },
            component: () => import('@/views/Slide/Constructor.vue')
          },
        ]
      },
      {
        path: 'contact',
        component: PathThrough,
        children: [
          {
            name: 'admin.contact',
            path: '',
            component: () => import('@/views/Contact/Index.vue')
          },
          {
            name: 'admin.contact.create',
            path: 'create',
            meta: {
              isCreatePage: true
            },
            component: () => import('@/views/Contact/Constructor.vue')
          },
          {
            name: 'admin.contact.change',
            path: ':id/change',
            meta: {
              isCreatePage: false
            },
            component: () => import('@/views/Contact/Constructor.vue')
          }
        ]
      },
      {
        path: 'orders',
        component: PathThrough,
        children: [
          {
            name: 'admin.order',
            path: '',
            component: () => import('@/views/Requests/Index.vue')
          },
          {
            name: 'admin.order.change',
            path: ':id/change',
            meta: {
              isCreatePage: false
            },
            component: () => import('@/views/Requests/Constructor.vue')
          }
        ]
      },
      {
        path: 'relationship',
        component: PathThrough,
        children: [
          {
            name: 'relationship.realtyType',
            path: 'realty-type/:id',
            component: () => import('@/views/Relationships/RealtyType/Index.vue')
          },
          {
            name: 'relationship.equipments',
            path: 'equipments/:id',
            component: () => import('@/views/Relationships/Equipment.vue')
          }
        ]
      },
      {
        path: 'user',
        component: PathThrough,
        children: [
          {
            name: 'admin.user',
            path: '',
            component: () => import('@/views/User/Index.vue')
          },
          {
            name: 'admin.user.create',
            path: 'create',
            meta: {
              isCreatePage: true
            },
            component: () => import('@/views/User/Constructor.vue')
          },
          {
            name: 'admin.user.change',
            path: ':id/change',
            meta: {
              isCreatePage: false
            },
            component: () => import('@/views/User/Constructor.vue')
          },
          {
            name: 'admin.user.chat',
            path: ':id/chat',
            meta: {
              isCreatePage: false
            },
            component: () => import('@/views/User/Chat.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_PATH,
  routes
})

export default router
