<template>
  <ViewRealty :view-realty="formData"/>
</template>

<script lang="ts">
import ViewRealty from "@/views/Realty/ViewRealty/ViewRealty.vue"
import {Component, Prop, Vue} from "vue-property-decorator";


@Component({
  components: {ViewRealty}
})
export default class PreviewTab3 extends Vue {
  @Prop({ required: true }) formData!: { [key: string]: string | number | Array<string> | Array<File> | File }
}
</script>

<style scoped>

</style>
