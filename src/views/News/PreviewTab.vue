<template>
<div class="">
  <b-card class="shadow-sm mb-3" header="Слайдер">
    <NewsSlide :id="formData.id"
               :photo="formData.photo"
               :header="formData.header"
               :content="formData.content"
    />
  </b-card>
    <b-card class="shadow-sm mb-3 ">
      <NewsCard :id="formData.id"
                style="width: 400px; height: 300px"
                :img-path="formData.photo"
                :name="formData.header"
                :content="formData.content"
      />
  </b-card>

</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import NewsSlide from "@/components/NewsSlide.vue";
import NewsCard from "@/components/NewsCard.vue";

@Component({
  components: {NewsCard, NewsSlide}
})
export default class PreviewTab extends Vue {
  @Prop({ required: true }) formData!: { [key: string]: string | number | Array<string> | Array<File> | File }
}
</script>

<style scoped>

</style>