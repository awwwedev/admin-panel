<template>
  <RealtyView :view-realty="formData"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import RealtyView from "@/git-modules/common/src/components/RealtyView.vue";


@Component({
  components: {RealtyView}
})
export default class PreviewTab3 extends Vue {
  @Prop({ required: true }) formData!: { [key: string]: string | number | Array<string> | Array<File> | File }
}
</script>

<style scoped>

</style>
