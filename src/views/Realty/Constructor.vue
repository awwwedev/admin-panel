<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-form>
      <b-card class="mb-3" header="Описание">
        <b-form-group label="Название"
                      label-for="name"
                      description="Должно быть коротким для корректного отображения в карточках"
        >
          <b-form-input id="name"
                        v-model.trim="formData.name"
          />

        </b-form-group>
        <b-form-group label="Описание"
                      label-for="description"
        >
          <b-form-textarea
              id="textarea"
              v-model.trim="formData.description"
              rows="3"
              max-rows="10"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Тип"
                      label-for="type"
        >
          <b-select
              id="type"
              v-model="formData.type_id"
          >
            <b-select-option v-for="(type, idx) in types"
                             :key="idx"
                             :value="type.id"
            >
              {{ type.name }}
            </b-select-option>
          </b-select>
        </b-form-group>
      </b-card>
      <b-card class="mb-3" header="Цена">
        <b-form-group label="Площадь (м. кв.)"
                      label-for="area"
        >
          <b-form-input id="area"
                        v-model.number="formData.area"
                        type="number"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Стоимость за м. кв."
                      label-for="price-per-metr"
        >
          <b-form-input id="price-per-metr"
                        v-model.number="formData.price_per_metr"
                        type="number"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Итоговая стоимость (руб.)"
                      label-for="price"
        >
          <b-form-input id="price"
                        v-model.number="formData.price"
                        type="number"
                        disabled
          ></b-form-input>
        </b-form-group>
      </b-card>
      <b-card class="mb-3" header="Основное изображение">
        <UploadedImage :image="formData.img_path"/>
        <b-file browse-text="Обзор..."
                v-model="formData.img_path"
        >
          <template #placeholder>
            Нет файлов
          </template>
        </b-file>
      </b-card>
      <b-card class="mb-3" header="Изображения для слайдера">
        <div class="images-grid mb-3">
          <UploadedImage v-for="(file, idx) in formData.photo"
                         :key="idx"
                         :image="file"
                         with-delete
                         @delete="onDeleteUploadedImage"
          />
        </div>
        <b-file browse-text="Обзор..."
                multiple
                v-model="tempPhotos"
        >
          <template #placeholder>
            Нет файлов
          </template>
          <template #file-name>
            {{ uploadedIMageNames }}
          </template>
        </b-file>
      </b-card>
      <div class="d-flex mb-5">
        <template v-if="isCreatePage">
          <b-button variant="success" class="mr-2" type="submit">Создать</b-button>
          <b-button variant="secondary">Отмена</b-button>
        </template>
        <template v-else>
          <b-button>Сохранить</b-button>
          <b-button>Применить</b-button>
          <b-button>Отмена</b-button>
        </template>
      </div>
    </b-form>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from "vue-property-decorator";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import {required} from "vuelidate/lib/validators";
import UploadedImage from "@/components/UploadedImage.vue";

@Component({
  components: {UploadedImage},
  validations: {
    formData: {
      password: {
        required
      },
      area: {
        required
      },
      price_per_metr: {
        required
      },
      type_id: {
        required
      },
    }
  }

})
export default class Constructor extends Mixins<Validation>(validationMixin, ValidationMixin) {
  allowSetNameByDesc = true
  imgPreview = ''
  tempPhotos = []
  formData = {
    name: '',
    description: '',
    area: 0,
    price_per_metr: 0,
    price: 0,
    type_id: '',
    img_path: null,
    photo: [] as Array<File>
  }
  types = [
    {
      id: '',
      name: '--- Выберите тип ---'
    },
    {
      id: 0,
      name: 'Склад'
    }
  ]

 get isCreatePage (): boolean { return this.$route.meta.isCreatePage }
 get pageName (): string { return this.$route.meta.isCreatePage ? 'Создание новой недвижимости' : 'Редактирование недвижимости' }
 get totalPrice (): number { return this.formData.area * this.formData.price_per_metr }
 get uploadedIMageNames (): string { return this.formData.photo.map(value => value.name).join(', ') }

 onDeleteUploadedImage (image: File): void {
   this.formData.photo = this.formData.photo.filter(value => value.name !== image.name && value.lastModified !== image.lastModified)
 }

 @Watch('formData.description')
 watchFormDataDescription (desc: string, oldDesc: string): void {
    if (oldDesc.slice(0, 100) !== this.formData.name && this.formData.name !== '') return

    if (desc.length <= 20) {
      this.formData.name = desc
      this.allowSetNameByDesc = true
    } else {
      if (this.allowSetNameByDesc) {
        this.formData.name = this.formData.name + '...'
        this.allowSetNameByDesc = false
      }
    }
 }
 @Watch('totalPrice')
 watchTotalPrice (price: number): void {
   this.formData.price = price
 }
 @Watch('formData.img_path')
 watchFormDataImagePath(file: File): void {
   const reader = new FileReader();

   reader.onload = () => {
     this.imgPreview = reader.result as string
   }

   reader.readAsDataURL(file);
 }
 @Watch('tempPhotos')
 watchTempPhotos(files: Array<File>): void {
    this.formData.photo = [...this.formData.photo, ...files]
 }
}
</script>

<style scoped lang="stylus">
.images-grid {
  display grid
  grid-template-columns repeat(3, 1fr)
  grid-column-gap 10px
  grid-row-gap 10px
}
</style>
