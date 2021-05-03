<template>
    <div class="text-secondary mb-3">
      <template v-if="info">
      {{ info.leftBound }} - {{ info.rightBound }} / {{ total }}
      </template>

      <template v-else>
        Всего {{ total }}
      </template>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {itemCountInfo} from "@/common/types";

@Component({

})
export default class ItemsCountInfo extends Vue {
  @Prop({ required: false,  type: Object }) info?: itemCountInfo
  @Prop({ required: true,  type: Number }) total!: number
}
</script>

<style scoped>

</style>