<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-nav tabs class="mb-3" >
      <b-nav-item :active="activeTab === 0" @click="activeTab = 0">{{ mainTabName }}</b-nav-item>
      <b-nav-item :active="activeTab === 1" @click="activeTab = 1">Предпросмотр карточек</b-nav-item>
      <b-nav-item :active="activeTab === 2" @click="activeTab = 2">Предпросмотр страницы</b-nav-item>
    </b-nav>
    <b-form v-if="activeTab === 0" @submit.prevent="onSubmit">
      <b-card class="mb-3 shadow-sm" header="Описание">
        <b-form-group label="Название"
                      label-for="name"
                      description="Должно быть коротким для корректного отображения в карточках"
                      :invalid-feedback="getValidationMessage($v.formData.name)"
        >
          <b-form-input id="name"
                        v-model.trim="formData.name"
                        :state="getFieldState($v.formData.name)"
          />
        </b-form-group>
        <b-form-group label="Описание"
                      label-for="description"
                      :invalid-feedback="getValidationMessage($v.formData.description)"
        >
          <b-form-textarea
              id="textarea"
              v-model.trim="formData.description"
              rows="3"
              max-rows="10"
              :state="getFieldState($v.formData.description)"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Тип"
                      label-for="type"
                      :invalid-feedback="getValidationMessage($v.formData.type_id)"
        >
          <b-select
              id="type"
              v-model="formData.type_id"
              :state="getFieldState($v.formData.type_id)"
          >
            <b-select-option :value="null">--- Выберите тип ---</b-select-option>
            <b-select-option v-for="(type, idx) in types"
                             :key="idx"
                             :value="type.id"
            >
              {{ type.name }}
            </b-select-option>
          </b-select>
        </b-form-group>
        <b-form-group label="Дополнительно"
                      label-for="equipment"
        >
          <b-select
              id="equipment"
              v-model="temp.equipments"
              multiple
          >
            <b-select-option v-for="(equipment, idx) in equipments"
                             :key="idx"
                             :value="equipment.id"
            >
              {{ equipment.name }}
            </b-select-option>
          </b-select>
        </b-form-group>
      </b-card>
      <b-card class="mb-3 shadow-sm" header="Цена">
        <b-form-group label="Площадь (м. кв.)"
                      label-for="area"
                      :invalid-feedback="getValidationMessage($v.formData.area)"
        >
          <b-form-input id="area"
                        v-model.number="formData.area"
                        type="number"
                        :state="getFieldState($v.formData.area)"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Стоимость за м. кв."
                      label-for="price-per-metr"
                      :invalid-feedback="getValidationMessage($v.formData.price_per_metr)"
        >
          <b-form-input id="price-per-metr"
                        v-model.number="formData.price_per_metr"
                        type="number"
                        :state="getFieldState($v.formData.price_per_metr)"
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
      <b-card class="mb-3 shadow-sm" header="Изображения для слайдера">
        <div class="images-grid mb-3">
          <UploadedImage v-for="(file, idx) in sliderImagesToDisplay"
                         :key="idx"
                         :image="file"
                         with-delete
                         @delete="onDeleteUploadedImage"
          />
        </div>
        <b-form-group label-for="img_path"
                      :invalid-feedback="getValidationMessage($v.formData.photo)"
        >
          <b-file v-model="temp.uploadedImagesModel"
                  browse-text="Обзор..."
                  multiple
                  :state="getFieldState($v.formData.photo)"
        >
          <template #placeholder>
            Нет файлов
          </template>
          <template #file-name>
            {{ uploadedIMageNames }}
          </template>
        </b-file>
        </b-form-group>
      </b-card>
      <b-card class="mb-3 shadow-sm" header="Карта">
        <yandex-map :coords="temp.center"
                    :zoom="zoom"
                    :behaviors="['drag', 'scrollZoom', 'multiTouch']"
                    :controls="['zoomControl', 'searchControl']"
                    map-type="map"
                    ref="map"
                    class="map"
                    @click="onMapClick"
        >
          <ymap-marker
              :coords="[formData.latitude, formData.longitude]"
              :balloon="{header: 'header', body: 'body', footer: 'footer'}"
              :icon="{layout: 'islands#32a1d0HomeIcon'}"
              cluster-name="1"
              @balloonopen="bus.$emit('yandex-map::open-balloon-' + formData.id)"
              @balloonclose="bus.$emit('yandex-map::close-balloon-' + formData.id)"
              :marker-id="formData.id"
              ref="marker"
              :key="temp.previewImagePath"
          >
            <Balloon slot="balloon"
                     :area="formData.area"
                     :description="formData.description"
                     :img-path="temp.previewImagePath"
                     :name="formData.name"
                     :price="formData.price_per_metr"
                     :id="formData.id"
                     disable-link
            />
          </ymap-marker>

        </yandex-map>
        <div class="pt-3">
          <b-form-group label="Широта"
                        label-for="latitude"
                        :invalid-feedback="getValidationMessage($v.formData.latitude)"
          >
            <b-form-input id="latitude"
                          v-model.number="formData.latitude"
                          type="number"
                          :state="getFieldState($v.formData.latitude)"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Долгота"
                        label-for="longitude"
                        :invalid-feedback="getValidationMessage($v.formData.longitude)"
          >
            <b-form-input id="latitude"
                          v-model.number="formData.longitude"
                          type="number"
                          :state="getFieldState($v.formData.longitude)"
            ></b-form-input>
          </b-form-group>
        </div>
      </b-card>
      <div class="d-flex mb-5">
        <template v-if="isCreatePage">
          <b-button variant="primary" class="mr-2" type="submit">Создать</b-button>
          <b-button :to="{ name: 'admin.realty' }" variant="secondary">Отмена</b-button>
        </template>
        <template v-else>
          <b-button variant="primary" class="mr-2" @click="onSubmit">Сохранить</b-button>
          <b-button variant="success" class="mr-2" @click="onSubmit(false)">Применить</b-button>
          <b-button :to="{ name: 'admin.realty' }" class="mr-2" variant="secondary">Отмена</b-button>
        </template>
      </div>
    </b-form>
    <PreviewTab2 v-if="activeTab === 1"
                 :form-data="formDataForPreview"
    />
    <PreviewTab3 v-if="activeTab === 2"
                 :form-data="formDataForPreview"
    />
  </div>
</template>

<script lang="ts">
// @ts-ignore
import {yandexMap, ymapMarker} from "vue-yandex-maps";
import {Component, Mixins, Watch} from "vue-property-decorator";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import {required, minValue} from "vuelidate/lib/validators";
import UploadedImage from "@/components/UploadedImage.vue";
import bus from "@/common/bus";
import Balloon from "@/components/RealtyCard2.vue";
import PreviewTab2 from "@/views/Realty/PreviewTab2.vue";
import PreviewTab3 from "@/views/Realty/PreviewTab3.vue";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import RealtyType from "@/models/RealtyType";
import Realty from "@/models/Realty";

@Component({
  components: {PreviewTab3, PreviewTab2, UploadedImage, yandexMap, ymapMarker, Balloon},
  validations: {
    formData: {
      name: {
        required
      },
      description: {
        required
      },
      area: {
        required,
        minValue: minValue(1)
      },
      price_per_metr: {
        required,
        minValue: minValue(1)
      },
      type_id: {
        required
      },
      longitude: {
        required
      },
      latitude: {
        required
      },
      img_path: {
        required
      },
      photo: {
        required
      },
    }
  },
  data: () => ({
    bus
  })
})
export default class Constructor extends Mixins<Validation>(validationMixin, ValidationMixin) {
  zoom = 19
  allowSetNameByDesc = true
  activeTab = 0
  equipments = [
    {
      id: 'heating',
      name: 'Отопление'
    },
    {
      id: 'restroom',
      name: 'Отдельный санузел'
    },
    {
      id: 'energy',
      name: 'Индивидуальный узел учёта электроэнергии'
    },
    {
      id: 'access',
      name: 'Круглосуточный доступ'
    },
    {
      id: 'furniture',
      name: 'Мебелью укомплектован'
    }
  ]
  temp = {
    center: [44.583460, 33.482296],
    previewImagePath: '',
    previewImageModel: null as File | null,
    uploadedImagesModel: [] as Array<File>,
    uploadedImages: [] as Array<File>,
    equipments: [] as Array<string>
  }
  formData = {
    id: -1,
    name: '',
    description: '',
    area: 0,
    price_per_metr: 0,
    price: 0,
    type_id: null as null | number,
    img_path: null as File | string | null,
    photo: [] as Array<File> | Array<string>,
    latitude: null as null | number,
    longitude: null as null | number,
    newPhoto: [] as Array<File>
  }
  formDataForPreview = {}
  types = [] as Array <RealtyType>

  get isCreatePage(): boolean { return this.$route.meta.isCreatePage }
  get pageName(): string { return this.$route.meta.isCreatePage ? 'Создание новой недвижимости' : 'Редактирование недвижимости' }
  get mainTabName(): string { return this.$route.meta.isCreatePage ? 'Создание' : 'Редактирование' }
  get totalPrice(): number { return (this.formData.area as number )* (this.formData.price_per_metr as number) }
  get uploadedIMageNames(): string { return this.temp.uploadedImages.map(value => value.name).join(', ') }
  get equipmentsForAddToFormData(): { [key: string]: number } {
    return this.equipments.reduce((acc, value) => {
      acc[value.id as string] = 0

      return acc
    }, {} as { [key: string]: number })
  }
  get sliderImagesToDisplay (): Array<File|string> {
    if (this.isCreatePage) {
      return this.formData.photo
    } else {
      return [...this.formData.photo, ...this.temp.uploadedImages]
    }
  }

  onDeleteUploadedImage(image: File | string): void {
    if (image instanceof File) {
      this.temp.uploadedImages = this.temp.uploadedImages.filter(value => value.name !== image.name && value.lastModified !== image.lastModified)
    } else {
      this.formData.photo = (this.formData.photo as Array<string>).filter(value => value !== image)
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  onMapClick (e: any): void {
    const coords = e.get('coords')

    this.formData.latitude = coords[0] as number
    this.formData.longitude = coords[1] as number
  }
  onSubmit (redirect = true): void {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      if (this.isCreatePage) {
        getModule(Notification, this.$store).setData({ title: 'Запись успешно создана', variant: 'success' })
      } else {
        getModule(Notification, this.$store).setData({ title: 'Запись успешно изменена', variant: 'success' })
      }

      if (redirect) {
        this.$router.push({ name: 'admin.realty' })
      }
    } else {
      getModule(Notification, this.$store).setData({ title: 'Ошибка валидации!', text: 'Проверте корректность и запоолненость полей', variant: 'danger' })
    }
  }

  @Watch('formData.description')
  watchFormDataDescription(desc: string, oldDesc: string): void {
    if (oldDesc.slice(0, 100) !== this.formData.name && this.formData.name !== '') return

    if (desc.length <= 20) {
      this.formData.name = desc
      this.allowSetNameByDesc = true
    } else {
      if (this.allowSetNameByDesc) {
        this.allowSetNameByDesc = false
      }
    }
  }
  @Watch('totalPrice')
  watchTotalPrice(price: number): void {
    this.formData.price = price
  }
  @Watch('temp.uploadedImagesModel')
  watchTempUploadedImagesModel(files: Array<File>): void {
    this.temp.uploadedImages = [...this.temp.uploadedImages, ...files]
  }
  @Watch('temp.uploadedImages')
  watchTempPhotos(files: Array<File>): void {
    if (this.isCreatePage) {
      this.formData.photo = files
    } else {
      this.formData.newPhoto = files
    }
  }
  @Watch('temp.previewImageModel')
  watchTempPreviewImageModel(file: File): void {
    this.formData.img_path = file
  }
  @Watch('temp.equipments')
  watchSelectedEquipments(equipments: Array<string>): void {
    const equipmentsSelected = equipments.reduce((acc, value) => {
      acc[value] = 1

      return acc
    }, {} as { [key: string]: number })

    this.formData = {...this.formData, ...this.equipmentsForAddToFormData, ...equipmentsSelected}
  }
  @Watch('temp.previewImagePath')
  @Watch('formData', { immediate: true, deep: true })
  watchFormData (): void {
    let photo

    if (this.isCreatePage) {
      photo = (this.formData.photo as Array<File>).map(file => {
        return  URL.createObjectURL(file)
      })
    } else {
      photo = (this.formData.newPhoto as Array<File>).map(file => {
        return  URL.createObjectURL(file)
      })
      photo = [...this.formData.photo, ...photo]
    }

    const realtyTypeName = this.types.find(value => value.id === (this.formData.type_id as unknown as number))

    this.formDataForPreview = {
      ...this.formData,
      img_path: this.temp.previewImagePath,
      photo,
      realtyTypeName: realtyTypeName ? realtyTypeName.name : ''
    }
  }

  created (): void {
    RealtyType.getList().then(response => {
      this.types = [ new RealtyType({ name: '--- Выберите тип ---', id: '' }) , ...response.data ]
    })

    if (!this.isCreatePage) {
      Realty.get(({ id: Number(this.$route.params.id) }))
          .then(response => {
            const realty = response.data
            this.temp.center = [realty.latitude as number, realty.longitude as number]
            this.formData.photo = realty.photo as Array<string>
            this.formData.img_path = realty.img_path as string
            this.temp.previewImagePath = realty.img_path as string
            this.formData = {...this.formData, ...realty}

            console.log(realty)
            console.log(this.formData)

            this.equipments.forEach(value => {
              // @ts-ignore
              if (this.formData[value.id] === 1) {
                this.temp.equipments.push(value.id)
              }
            })
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
