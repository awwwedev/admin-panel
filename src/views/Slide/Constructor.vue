<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-form>
      <Dates :form-data="formData"/>
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
        <UploadedImage :image="formData.image" @imageInitialized="temp.previewImagePath = $event"/>
        <b-form-group label-for="img_path"
                      :invalid-feedback="getValidationMessage($v.formData.image)"
        >
          <b-file browse-text="Обзор..."
                  id="img_path"
                  v-model="temp.previewImageModel"
                  :state="getFieldState($v.formData.image)"
          >
            <template #placeholder>
              Нет файлов
            </template>
          </b-file>
        </b-form-group>
      </b-card>
    </b-form>
    <ConstructorActions :cancel-to="{ name: 'admin.slide' }" :is-create-page="isCreatePage" @submit="onSubmit"/>
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
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import Slide from "@/models/Slide";
import Dates from "@/components/constructor/Dates.vue";


@Component({
  components: {Dates, UploadedImage, ConstructorActions},
  validations: {
    formData: {
      header: {
        required
      },
      image: {
        required
      },
      content: {
        required
      },
    },
  }
})
export default class Constructor extends Mixins<Validation, ValidationMixin, ConstructorHelpers>(validationMixin, ValidationMixin, ConstructorHelpers) {
  entityName = 'слайда'
  entityNamePrefixChange= 'Редактирование '
  entityNamePrefixCreate= 'Создание '
  formData = {
    id: null as null | number,
    header: '',
    content: '',
    image: null as File | string | null,
    created_at:  null as string | null,
    updated_at: null as string | null
  }
  temp = {
    previewImagePath: '',
    previewImageModel: null as File | null,
  }

  onSubmit(redirect = true): void {
    let request
    this.$v.$touch()

    if (!this.$v.$invalid) {
      if (this.isCreatePage) {
        request = Slide.create(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно создана', variant: 'success'})
              this.$router.push({name: 'admin.slide.change', params: {id: response.data.id as unknown as string}})
            })
      } else {
        request = Slide.update(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно изменена', variant: 'success'})
              this.updateFormData(response.data)
            })
      }
      request.then(() => {
        if (redirect) {
          this.$router.push({name: 'admin.slide'})
        }
      })
    } else {
      getModule(Notification, this.$store).setData({
        title: 'Ошибка валидации!',
        text: 'Проверте корректность и запоолненость полей',
        variant: 'danger'
      })
    }
  }

  updateFormData(slide: Slide): void {
    this.temp = {previewImageModel: null, previewImagePath: slide.image as string}
    this.formData = {
      content: slide.content as string,
      header: slide.header as string,
      id: slide.id as number,
      image: slide.image as string,
      created_at: slide.created_at as string,
      updated_at: slide.updated_at as string
    }
  }

  @Watch('temp.previewImageModel')
  watchTempPreviewImageModel(file: File): void {
    if (!file) return

    this.formData.image = file
  }

  @Watch('$route.meta.isCreatePage', { immediate: true })
  watchIsCreatePage(isCreatePage: boolean): void {
    if (!isCreatePage) {
      Slide.get(({id: Number(this.$route.params.id)}))
          .then(response => {
            this.updateFormData(response.data)
          })
    }
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

