<template>
  <div class="mx-auto flex-column justify-content-between"
       :class="{ 'd-flex':!image, 'd-inline-flex':image }"
  >
    <b-img :src="basePath + imagePath"
           thumbnail
           fluid
           :blank="!imagePath"
           blank-color="#777"
           class="mb-2"
           block
           style="max-height: 400px"
           :style="[ `width: ${imagePath ? 'auto' : '100%'}` ]"
    />
    <div class="d-flex justify-content-center" v-if="withDelete">
      <b-button @click="onDelete" variant="danger">Удалить</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch, Emit} from "vue-property-decorator";

type uploadedImage =  File | null | string

@Component({
  data: () => ({
    basePath: process.env.VUE_APP_URL
  })
})
export default class UploadedImage extends Vue {
  imagePath = ''

  @Prop({required: true}) image!: uploadedImage
  @Prop({required: false, default: false, type: Boolean}) withDelete!: boolean

  @Emit('delete')
  onDelete(): uploadedImage {
    return this.image
  }

  @Emit('imageInitialized')
  omImageInitialized(): string {
    return this.imagePath
  }

  @Watch('image', {immediate: true})
  watchImage(image: uploadedImage): void {
    if (image instanceof File) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePath = reader.result as string

        this.omImageInitialized()
      }

      reader.readAsDataURL(image);
    } else if (image) {
      this.imagePath = image
    }
  }
}

</script>

<style scoped>

</style>
