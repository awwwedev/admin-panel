<template>
  <div class="">
    <b-card header="Каталог" class="shadow-sm mb-3">
      <RealtyCard :id="formData.id"
                  :img-path="formData.img_path"
                  :area="formData.area"
                  :price="formData.price_per_metr"
                  :title="formData.name"
                  :discount="formData.discount_sum"
                  :total-price="formData.price"
      />
    </b-card>
    <b-card header="Карта" class="shadow-sm mb-3">
      <b-card class="d-inline-block">
        <RealtyCard2 :id="formData.id"
                     :img-path="formData.img_path"
                     :area="formData.area"
                     :price="formData.price_per_metr"
                     :description="formData.description"
                     :name="formData.name"
                     :discount="formData.discount_sum"
        />
      </b-card>
    </b-card>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import RealtyCard from "@/git-modules/common/src/components/RealtyCard.vue";
import RealtyCard2 from "@/git-modules/common/src/components/RealtyCard2.vue";


@Component({
  components: {RealtyCard2, RealtyCard}
})
export default class PreviewTab2 extends Vue {
  @Prop({ required: true }) formData!: { [key: string]: string | number | Array<string> | Array<File> | File }

}
</script>

<style scoped lang="stylus">

</style>
