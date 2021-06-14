<template>
  <div class="wrapper">
    <div class="grid">
      <div class="grid__side-bar">
        <div v-if="!visibleSideBar" class="pre-sidebar">
          <span class="pre-sidebar__btn" @click="visibleSideBar = true"><b-icon icon="list" scale="2"/></span>
        </div>
        <b-sidebar ref="sidebar"  v-model="visibleSideBar" :backdrop="windowWidth < 850" no-close-on-route-change :no-close-on-backdrop="windowWidth > 850" no-close-on-esc no-header-close
                   :z-index="2" shadow>
          <template #header>
            <div class="pt-1 d-flex justify-content-end align-items-end w-100" >
              <span v-if="windowWidth < 850" class="px-2 cursor-pointer" @click="visibleSideBar = false">
                <b-icon icon="x" scale="2"/>
              </span>
            </div>
          </template>
          <div class="px-2">
            <nav class="mb-3">
              <b-nav vertical>
                <b-card no-body class="mb-1">
                  <template #header>
                    <span type="button" class="d-block" @click="accordionIdx = 1">Основной контент</span>
                  </template>
                  <b-collapse :visible="accordionIdx === 1">
                    <b-list-group>
                      <b-list-group-item @click="visibleSideBar = windowWidth > 850" v-for="(link, idx) in navLinks" :key="idx">
                        <template v-if="!isActiveRoute(link.routeName)">
                          <b-link class="d-block" type="button" :to="{ name: link.routeName, query: { accordionIdx } }">{{ link.label }}</b-link>
                        </template>
                        <template v-else>
                          <span class="d-block" :class="{ 'mb-2': $route.name.includes(link.routeName) }">{{ link.label }}</span>
                          <b-list-group>
                            <b-list-group-item :active="!$route.meta.hasOwnProperty('isCreatePage')" :to="{ name: link.routeName, query: { accordionIdx } }">
                              Все записи
                            </b-list-group-item>
                            <b-list-group-item :to="{ name: link.routeName + '.create', query: { accordionIdx } }" :active="$route.meta.isCreatePage">
                              Создание
                            </b-list-group-item>
                            <b-list-group-item :active="$route.meta.hasOwnProperty('isCreatePage') && !$route.meta.isCreatePage" disabled>
                              Изменение
                            </b-list-group-item>
                          </b-list-group>
                        </template>
                      </b-list-group-item>
                    </b-list-group>
                  </b-collapse>
                </b-card>
                <b-card no-body>
                  <template #header>
                    <span type="button" class="d-block" @click="accordionIdx = 2">Управление пользователями</span>
                  </template>
                  <b-collapse id="collapseNavContent" :visible="accordionIdx === 2">
                    <b-list-group>
                      <b-list-group-item @click="visibleSideBar = windowWidth > 850" v-for="(link, idx) in navLinks2" :key="idx">
                        <template v-if="!isActiveRoute(link.routeName)">
                          <b-link class="d-block" type="button" :to="{ name: link.routeName, query: { accordionIdx } }">{{ link.label }}</b-link>
                        </template>
                        <template v-else>
                          <span class="d-block" :class="{ 'mb-2': $route.name.includes(link.routeName) }">{{ link.label }}</span>
                          <b-list-group>
                            <b-list-group-item :active="!$route.meta.hasOwnProperty('isCreatePage')" :to="{ name: link.routeName, query: { accordionIdx } }">
                              Все записи
                            </b-list-group-item>
                            <b-list-group-item :to="{ name: link.routeName + '.create', query: { accordionIdx } }" :active="$route.meta.isCreatePage">
                              Создание
                            </b-list-group-item>
                            <b-list-group-item :active="$route.meta.hasOwnProperty('isCreatePage') && !$route.meta.isCreatePage" disabled>
                              Изменение
                            </b-list-group-item>
                          </b-list-group>
                        </template>
                      </b-list-group-item>
                    </b-list-group>
                  </b-collapse>
                </b-card>
              </b-nav>
            </nav>
          </div>
          <template #footer>
            <div class="px-2 py-2 bg-dark d-flex justify-content-end">
              <b-button @click="onLogout">Выход</b-button>
            </div>
          </template>
        </b-sidebar>
      </div>
      <div class="grid__content">
          <router-view class="d-flex justify-content-center flex-column"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Ref, Vue, Watch} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import User from "@/store/modules/user";
import http from "@/common/http";
  import {BSidebar} from "bootstrap-vue";

@Component({})
export default class Index extends Vue {
  @Ref('sidebar') refSidebar!: BSidebar
  accordionIdx = 1
  visibleSideBar = false
  windowWidth = 0
  navLinks = [
    {
      routeName: 'admin.realty',
      label: 'Недвижимость'
    },
    {
      routeName: 'admin.realtyType',
      label: 'Категории недвижимости'
    },
    {
      routeName: 'admin.equipment',
      label: 'Комплектация недвижимости'
    },
    {
      routeName: 'admin.news',
      label: 'Новости'
    },
    {
      routeName: 'admin.slide',
      label: 'Слайды для слайдера'
    },
    {
      routeName: 'admin.contact',
      label: 'Контакты'
    }
  ]
  navLinks2 = [
    {
      routeName: 'admin.user',
      label: 'Пользователь'
    }
  ]

  onResize(): void {
    this.windowWidth = window.innerWidth
    this.visibleSideBar = this.windowWidth > 850
  }
  onLogout(): void {
    getModule(User, this.$store).logout()

    delete http.defaults.headers['Authorization']
    this.$cookies.remove('token')
  }
  isActiveRoute (routeName: string): boolean {
    return this.$route.name as unknown as boolean && routeName === (this.$route.name as string).replace(/\.create|\.change/, '')
  }


  created(): void {
    const accordionIdx = this.$route.query.accordionIdx

    this.accordionIdx = accordionIdx ? Number(accordionIdx) : 1

    addEventListener('resize', this.onResize)
    this.onResize()
  }
  beforeDestroy(): void {
    removeEventListener('resize', this.onResize)
  }

  @Watch('accordionIdx')
  watchAccordionIdx(): void {
    this.$router.onReady(() => {
     this.$router.replace({
       name: this.$route.name as string,
       query: {...this.$route.query, accordionIdx: String(this.accordionIdx)}
     }).catch(() => {
     })
   })
  }
}
</script>

<style scoped lang="stylus">

  .cursor-pointer
    cursor pointer

  .pre-sidebar
    height 100%

    &__btn
      display block
      padding 15px
      cursor pointer

.spinner
  height 50px
  width 50px

.grid
  height 100%
  width 100%
  display grid
  grid-template-columns 320px 1fr
  grid-template-areas "side-bar content"
  grid-column-gap 15px

  @media (max-width 850px)
    grid-template-columns 50px 1fr
    grid-column-gap 0

  &__side-bar
    width 100%
    grid-area side-bar

  &__content
    grid-area content
    padding-right 15px
    overflow-x hidden
</style>
