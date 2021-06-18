<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-form>
      <Dates :form-data="formData"/>
      <b-card class="mb-3 shadow-sm" header="Основное">
        <b-form-group label="Название"
                      label-for="name"
                      :invalid-feedback="getValidationMessage($v.formData.name)"
        >
          <b-form-input id="name"
                        v-model.trim="formData.name"
                        :state="getFieldState($v.formData.name)"
          />
        </b-form-group>
      </b-card>
      <b-card class="mb-3 shadow-sm" header="Основное изображение">
        <UploadedImage :image="formData.img_path" @imageInitialized="temp.previewImagePath = $event"/>
        <b-form-group label-for="img_path"
                      :invalid-feedback="getValidationMessage($v.formData.img_path)"
        >
          <b-file browse-text="Обзор..."
                  id="img_path"
                  v-model="temp.previewImageModel"
                  :state="getFieldState($v.formData.img_path)"
          >
            <template #placeholder>
              Нет файлов
            </template>
          </b-file>
        </b-form-group>
      </b-card>
    </b-form>
    <ConstructorActions :cancel-to="{ name: 'admin.realtyType' }" :is-create-page="isCreatePage" @submit="onSubmit"/>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from "vue-property-decorator";
import ConstructorHelpers from "@/mixins/constructorHelpers";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import {required} from "vuelidate/lib/validators";
import ConstructorActions from "@/components/widget/ConstructorActions.vue";
import RealtyType from "@/models/RealtyType";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import UploadedImage from "@/components/UploadedImage.vue";
import Dates from "@/components/constructor/Dates.vue";


@Component({
  components: {Dates, UploadedImage, ConstructorActions},
  validations: {
    formData: {
      name: {
        required
      },
      img_path: {
        required
      }
    }
  }
})
export default class Constructor extends Mixins<Validation, ValidationMixin, ConstructorHelpers>(validationMixin, ValidationMixin, ConstructorHelpers) {
  entityNameCreate = 'Создание типа недвижимости'
  entityNameChange = 'Изменение типа недвижимости'

  formData = {
    id: null as null | number,
    name: '',
    img_path: null as null | string | File,
    created_at:  null as string | null,
    updated_at: null as string | null
  }
  temp = {
    previewImagePath: null as string | null,
    previewImageModel: null as File | null
  }

  onSubmit(redirect = true): void {
    let request

    this.$v.$touch()

    if (!this.$v.$invalid) {
      if (this.isCreatePage) {
        request = RealtyType.create(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно создана', variant: 'success'})
              this.$router.push({name: 'admin.realtyType.change', params: {id: response.data.id as unknown as string}})
              this.$v.$reset()
            })
      } else {
        request = RealtyType.update(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно изменена', variant: 'success'})
              this.updateFormData(response.data)
              this.$v.$reset()
            })
      }
      request.then(() => {
        if (redirect) { this.$router.push({name: 'admin.realtyType'}) }
      })
    } else {
      getModule(Notification, this.$store).setData({ title: 'Ошибка валидации!',  text: 'Проверте корректность и запоолненость полей',  variant: 'danger' })
    }
  }

  updateFormData (type: RealtyType): void {
    this.temp = { previewImageModel: null, previewImagePath: type.img_path as string }
    this.formData = {
      name: type.name as string,
      id: type.id as number,
      img_path: type.img_path as string,
      created_at: type.created_at as string,
      updated_at: type.updated_at as string}
  }

  @Watch('temp.previewImageModel')
  watchTempPreviewImageModel(file: File): void {
    if (!file) return

    this.formData.img_path = file
  }

  @Watch('$route.meta.isCreatePage', { immediate: true })
  watchIsCreatePage(isCreatePage: boolean): void {
    if (!isCreatePage) {
      RealtyType.get({id: this.$route.params.id as unknown as number})
          .then(response => this.updateFormData(response.data))
    }
  }
}
</script>

<style scoped>

</style>
