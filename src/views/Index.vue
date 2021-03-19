<template>
  <div class="wrapper">
    <b-navbar type="primary" variant="primary" style="z-index: 3" class="mb-3">
      <b-navbar-brand href="#">BootstrapVue</b-navbar-brand>
    </b-navbar>
    <b-sidebar visible no-header-close :z-index="2" shadow>
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
    </b-sidebar>
    <router-view/>
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
</style>
