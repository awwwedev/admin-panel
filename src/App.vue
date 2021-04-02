<template>
  <div id="app">
    <b-container style="z-index: 1000; position: sticky; top: 0"
    >
      <b-alert :show="dismissCounter"
               :variant="$notificationData.variant || 'info'"
               dismissible
               @dismissed="onDismissed"
               fade
      >
        <h4 class="alert-heading" v-if="$notificationData.title">{{ $notificationData.title }}</h4>
        <hr v-if="$notificationData.title && $notificationData.text">
        <p class="mb-0">
          {{ $notificationData.text }}
        </p>
      </b-alert>
    </b-container>
    <div v-if="!$userIsLogged && $userInInitState && allowInitUser"
         class="text-center h-100 d-flex align-items-center justify-content-center"
    >
      <b-spinner
          variant="primary"
          class="spinner"
      />
    </div>
    <router-view v-else/>
  </div>

</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {notification} from "@/common/types";
import {getModule} from "vuex-module-decorators";
import Notification from '@/store/modules/notification'
import User from "@/store/modules/user";
import http from "@/common/http";

@Component({
  computed: {
    ...mapGetters('notification', {
      $notificationData: 'getData'
    }),
      ...mapGetters('user', {
        $userIsLogged: 'getIsLogged',
        $userInInitState: 'getInInitState'
      })
  }
})
export default class App extends Vue {
  $notificationData!: notification
  $userIsLogged!: boolean
  $userInInitState!: boolean
  dismissCounter = 0
  get allowInitUser (): boolean { return this.$cookies.isKey('token') }

  onDismissed(): void {
    this.dismissCounter = 0
    getModule(Notification, this.$store).clearData()
  }

  @Watch('$notificationData')
  watchNotificationData(): void {
    if (Object.keys(this.$notificationData).length) {
      this.dismissCounter = this.$notificationData.direction || 6
    }
  }

  created (): void {
    this.$router.onReady(() => {
      if (this.allowInitUser) {
        http.defaults.headers['Authorization'] = 'Bearer ' + this.$cookies.get('token')

        getModule(User, this.$store).initUser().then(() => {
          if (this.$userIsLogged && this.$route.name === 'admin.login') {

            this.$router.replace({ name: 'admin.home' })
          }
        }).catch(() => {
          delete http.defaults.headers['Authorization']
          this.$cookies.remove('token')
        })
      } else {
        this.$router.replace({ name: 'admin.login' })
      }
    })
  }
}
</script>

<style lang="stylus">
html, body
  height 100%

body
  display: flex;
  flex-direction column

#app
  flex 1 1 100%
</style>
