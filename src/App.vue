<template>
  <div id="app">
    <b-container>
      <b-alert :show="dismissCounter"
               :variant="$notificationData.variant || 'info'"
               dismissible
               @dismissed="onDismissed"
      >
        <h4 class="alert-heading" v-if="$notificationData.title">{{ $notificationData.title }}</h4>
        <hr v-if="$notificationData.title">
        <p class="mb-0">
          {{ $notificationData.text }}
        </p>
      </b-alert>
    </b-container>
    <router-view/>
  </div>

</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {notification} from "@/common/types";
import {getModule} from "vuex-module-decorators";
import Notification from '@/store/modules/notification'

@Component({
  computed: {
    ...mapGetters('notification', {
      $notificationData: 'getData'
    })
  }
})
export default class App extends Vue {
  $notificationData!: notification
  dismissCounter = 0

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
}
</script>

<style lang="stylus">
html, body, #app
  height 100%
</style>
