<template>
  <div class="wrapper">
    <div class="grid">
      <div class="grid__side-bar">
        <b-sidebar class="" visible no-close-on-route-change no-close-on-backdrop no-close-on-esc no-header-close
                   :z-index="2" shadow>
          <template #title>
            <span class="d-block mb-sm-0 mb-md-5 "></span>
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
                      <b-list-group-item v-for="(link, idx) in navLinks" :key="idx">
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
                      <b-list-group-item v-for="(link, idx) in navLinks2" :key="idx">
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
import {Component, Vue, Watch} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import User from "@/store/modules/user";
import http from "@/common/http";

@Component({})
export default class Index extends Vue {
  accordionIdx = 1
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

  onLogout(): void {
    getModule(User, this.$store).logout()

    delete http.defaults.headers['Authorization']
    this.$cookies.remove('token')
  }

  created(): void {
    const accordionIdx = this.$route.query.accordionIdx

    this.accordionIdx = accordionIdx ? Number(accordionIdx) : 1
  }

  isActiveRoute (routeName: string): boolean {
    return this.$route.name as unknown as boolean && routeName === (this.$route.name as string).replace(/\.create|\.change/, '')
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

.spinner
  height 50px
  width 50px

.grid
  height 100%
  display grid
  grid-template-columns 320px 1fr
  grid-template-areas "side-bar content"
  grid-column-gap 15px

  &__side-bar
    width 100%
    grid-area side-bar

  &__content
    grid-area content
    padding-right 15px
</style>
