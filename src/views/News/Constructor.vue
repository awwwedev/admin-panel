<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-form>
      <b-card class="mb-3 shadow-sm" header="Основное">
        <b-form-group label="Заголовок"
                      label-for="header"
                      :invalid-feedback="getValidationMessage($v.formData.header)"
        >
          <b-form-input id="header"
                        v-model.trim="formData.header"
                        :state="getFieldState($v.formData.header)"
          />
        </b-form-group>
        <b-form-group label="Описание"
                      label-for="description"
                      :invalid-feedback="getValidationMessage($v.formData.content)"
        >
          <b-form-textarea
              id="textarea"
              v-model.trim="formData.content"
              rows="3"
              max-rows="10"
              :state="getFieldState($v.formData.content)"
          ></b-form-textarea>
        </b-form-group>

      </b-card>
      <b-card class="mb-3 shadow-sm" header="Основное изображение">
        <UploadedImage :image="formData.photo" @imageInitialized="temp.previewImagePath = $event"/>
        <b-form-group label-for="img_path"
                      :invalid-feedback="getValidationMessage($v.formData.photo)"
        >
          <b-file browse-text="Обзор..."
                  id="img_path"
                  v-model="temp.previewImageModel"
                  :state="getFieldState($v.formData.photo)"
          >
            <template #placeholder>
              Нет файлов
            </template>
          </b-file>
        </b-form-group>
      </b-card>
    </b-form>
    <ConstructorActions :cancel-to="{ name: 'admin.news' }" :is-create-page="isCreatePage" @submit="onSubmit"/>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from "vue-property-decorator";
import ConstructorHelpers from "@/mixins/constructorHelpers";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import {required} from "vuelidate/lib/validators";
import ConstructorActions from "@/components/widget/ConstructorActions.vue";
import UploadedImage from "@/components/UploadedImage.vue";
import News from "@/models/News";


@Component({
  components: {UploadedImage, ConstructorActions},
  validations: {
    formData: {
      header: {
        required
      },
      photo: {
        required
      },
      content: {
        required
      },
    },
  }
})
export default class Constructor extends Mixins<Validation, ValidationMixin, ConstructorHelpers>(validationMixin, ValidationMixin, ConstructorHelpers) {
  entityName = 'новости'
  formData = {
    id: null as null | number,
    header: '',
    content: '',
    photo: null as File | string | null,
  }
  temp = {
    previewImagePath: '',
    previewImageModel: null as File | null,
  }

  onSubmit (): void {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      console.log(123)
    }
  }

  created (): void {
    if (!this.isCreatePage) {
      News.get(({ id: Number(this.$route.params.id) }))
          .then(response => {
            const news = response.data
            this.formData.photo = news.photo as string
            this.temp.previewImagePath = news.photo as string
            this.formData = {...this.formData, ...news}
          })
    }
  }

  @Watch('temp.previewImageModel')
  watchTempPreviewImageModel(file: File): void {
    this.formData.photo = file
  }
}
</script>

<style scoped lang="stylus">
.images-grid
  display grid
  grid-template-columns repeat(3, 1fr)
  grid-column-gap 10px
  grid-row-gap 10px

.map
  height 600px
  width auto
</style>

