<template>
<div class="mx-auto d-inline-flex flex-column justify-content-between">
  <b-img :src="imagePath"
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

@Component({

})
export default class UploadedImage extends Vue {
  imagePath = ''

  @Prop({ required: true }) image!: File | null
  @Prop({ required: false, default: false, type: Boolean }) withDelete!: boolean

  @Emit('delete')
  onDelete (): File {
    return this.image as File
  }

  @Watch('image', { immediate: true })
  watchImage (image: File | null): void {
    if (image) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePath = reader.result as string
      }

      reader.readAsDataURL(image);
    }
  }
}

</script>

<style scoped>

</style>
