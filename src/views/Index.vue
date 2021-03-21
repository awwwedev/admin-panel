<template>
  <div class="wrapper">
    <div class="grid">
      <div class="grid__side-bar">
        <b-sidebar class="" visible no-close-on-route-change no-close-on-backdrop no-close-on-esc no-header-close :z-index="2" shadow>
          <template #title>
            <span class="d-block mb-sm-0 mb-md-5 "></span>
          </template>
          <div class="px-2">
            <nav class="mb-3">
              <b-nav vertical>
                <b-nav-item v-for="(link, idx) in navLinks"
                            :key="idx"
                            :to="{ name: link.routeName }"
                            :disabled="$route.name === link.routeName"

                >{{ link.label }}</b-nav-item>
              </b-nav>
            </nav>
          </div>
          <template #footer>
            <div class="px-2 py-2 bg-dark d-flex justify-content-end">
              <b-button>Выход</b-button>
            </div>
          </template>
        </b-sidebar>
      </div>
      <div class="grid__content">
        <router-view class="d-flex justify-content-center flex-column" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({

})
export default class Index extends Vue {
  navLinks = [
    {
      routeName: 'admin.realty',
      label: 'Недвижимость'
    },
    {
      routeName: 'admin.home',
      label: 'Катгории недвижимости'
    },
    {
      routeName: 'admin.home',
      label: 'Новости'
    }
  ]
}
</script>

<style scoped lang="stylus">
.wrapper
  height 100%

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
