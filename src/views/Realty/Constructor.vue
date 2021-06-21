<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-nav tabs class="mb-3" >
      <b-nav-item :active="activeTab === 0" @click="activeTab = 0">{{ mainTabName }}</b-nav-item>
      <b-nav-item :active="activeTab === 1" @click="activeTab = 1">Предпросмотр карточек</b-nav-item>
      <b-nav-item :active="activeTab === 2" @click="activeTab = 2">Предпросмотр страницы</b-nav-item>
    </b-nav>
    <b-form v-if="activeTab === 0" @submit.prevent="onSubmit">
      <Dates :form-data="formData"/>
      <b-card class="mb-3 shadow-sm" header="Описание">
        <b-form-group label="Название"
                      label-for="name"
                      :invalid-feedback="getValidationMessage($v.formData.name)"
        >
          <b-form-input id="name"
                        v-model.trim="formData.name"
                        :state="getFieldState($v.formData.name)"
          />
        </b-form-group>
        <b-form-group label="Краткое описание"
                      label-for="short_description"
                      :invalid-feedback="getValidationMessage($v.formData.short_description)"
        >
          <b-textarea id="short_description"
                        v-model.trim="formData.short_description"
                        :state="getFieldState($v.formData.short_description)"
          />
        </b-form-group>
        <b-form-group label="Описание"
                      label-for="description"
                      :invalid-feedback="getValidationMessage($v.formData.description)"
        >
          <vue-editor class="text-editor" id="description" v-model.trim="formData.description"
                      :editor-toolbar="customToolbar" :class="{ 'is-invalid': $v.formData.description.$error }"/>
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
        <b-form-group label="Комплектация"
                      label-for="equipment"
                      v-if="formData.type_id"
        >
          <p class="text-sm text-secondary" v-if="!equipments.length">
            Нет доступных вариантов
          </p>
          <b-checkbox-group v-else
              id="equipment"
          >
            <b-checkbox v-for="(equipment, idx) in equipments"
                        :key="idx"
                        :value="equipment.id"
                        v-model="formData.equipments"

            >
              {{ equipment.name }}
            </b-checkbox>
          </b-checkbox-group>
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
        <b-form-group label="Скидка (руб.)"
                      label-for="discount"
        >
          <b-form-input id="discount"
                        v-model.number="formData.discount_sum"
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
                      :invalid-feedback="getValidationMessage($v.formData.photo.$invalid ? $v.formData.photo : $v.formData.newPhoto)"
        >
          <b-file v-model="temp.uploadedImagesModel"
                  browse-text="Обзор..."
                  multiple
                  :state="getFieldState($v.formData.photo.$invalid ? $v.formData.photo : $v.formData.newPhoto)"
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
        <yandex-map :coords="formData.latitude && formData.longitude ? [formData.latitude, formData.longitude] : temp.center"
                    :zoom="zoom"
                    :behaviors="['drag', 'scrollZoom', 'multiTouch']"
                    :controls="['zoomControl', 'searchControl']"
                    map-type="map"
                    ref="map"
                    class="map"
                    @click="onMapClick"
                    :key="formData.id"
        >
          <ymap-marker v-if="formData.latitude && formData.longitude"
              :coords="[formData.latitude, formData.longitude]"
              :icon="{layout: 'islands#32a1d0HomeIcon'}"
              cluster-name="1"
              @balloonopen="bus.$emit('yandex-map::open-balloon-' + formData.id)"
              @balloonclose="bus.$emit('yandex-map::close-balloon-' + formData.id)"
              :marker-id="formData.id"
              ref="marker"
              :key="temp.previewImagePath + JSON.stringify(formData)"
          >
            <Balloon slot="balloon"
                     :area="formData.area"
                     :description="formData.short_description"
                     :img-path="temp.previewImagePath"
                     :name="formData.name"
                     :price="formData.price_per_metr"
                     :id="formData.id + temp.previewImagePath"
                     disable-link
                     :discount="formData.discount_sum"
            />
          </ymap-marker>

        </yandex-map>
        <div class="pt-3">
          <b-form-group label="Широта"
                        label-for="latitude"
                        :invalid-feedback="getValidationMessage($v.formData.latitude)"
          >
            <b-form-input id="latitude"
                          v-model.lazy="formData.latitude"
                          type="number"
                          step="0.001"
                          :state="getFieldState($v.formData.latitude)"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Долгота"
                        label-for="longitude"
                        :invalid-feedback="getValidationMessage($v.formData.longitude)"
          >
            <b-form-input id="latitude"
                          v-model.lazy="formData.longitude"
                          type="number"
                          step="0.001"
                          :state="getFieldState($v.formData.longitude)"
            ></b-form-input>
          </b-form-group>
        </div>
      </b-card>
      <b-checkbox-group class="mb-1">
        <b-checkbox v-model="temp.is_published" :value="1" :unchecked-value="0">
          Публикация
        </b-checkbox>
      </b-checkbox-group>
      <ConstructorActions :cancel-to="{ name: 'admin.realty' }" :is-create-page="isCreatePage" @submit="onSubmit"/>
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
// @ts-ignore
import {VueEditor} from 'vue2-editor'
import {Component, Mixins, Watch} from "vue-property-decorator";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import {required, minValue, requiredIf} from "vuelidate/lib/validators";
import UploadedImage from "@/components/UploadedImage.vue";
import bus from "@/common/bus";
import Balloon from "@/git-modules/common/src/components/RealtyCard2.vue";
import PreviewTab2 from "@/views/Realty/PreviewTab2.vue";
import PreviewTab3 from "@/views/Realty/PreviewTab3.vue";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import RealtyType from "@/models/RealtyType";
import Realty from "@/models/Realty";
import ConstructorHelpers from "@/mixins/constructorHelpers";
import ConstructorActions from "@/components/widget/ConstructorActions.vue";
import Equipment from "@/models/Equipment";
import Dates from "@/components/constructor/Dates.vue";
import {removeHtmlTags} from "@/common";


@Component({
  components: {
    Dates,
    ConstructorActions, PreviewTab3, PreviewTab2, UploadedImage, yandexMap, ymapMarker, Balloon, VueEditor},
  validations () {
    return {
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
        short_description: {
          required
        },
        img_path: {
          required
        },
        photo: {
          requiredIf: requiredIf (() => {
            // @ts-ignore
            return !this.formData.newPhoto.length
          })
        },
        newPhoto: {
          requiredIf: requiredIf (() => {
            // @ts-ignore
            return !this.formData.photo.length
          })
        },
      }
    }
  },
  data: () => ({
    bus,
    customToolbar: [[{
      header: [false, 2, 3, 4, 5, 6]
    }], ["bold", "italic", "underline", "strike"], // toggled buttons
      [{
        align: ""
      }, {
        align: "center"
      }, {
        align: "right"
      }, {
        align: "justify"
      }], ["blockquote", "code-block"], [{
        list: "ordered"
      }, {
        list: "bullet"
      }, {
        list: "check"
      }], [{
        indent: "-1"
      }, {
        indent: "+1"
      }],
      [{
        color: []
      }, {
        background: []
      }],
      ["link"], ["clean"]
    ]

  })
})
export default class Constructor extends Mixins<Validation, ValidationMixin, ConstructorHelpers>(validationMixin, ValidationMixin, ConstructorHelpers) {
  entityNameCreate = 'Создание недвижимости'
  entityNameChange = 'Изменение недвижимости'
  zoom = 19
  allowSetNameByDesc = true
  activeTab = 0
  equipments = [] as Array<Equipment>
  temp = {
    center: [44.583460, 33.482296],
    previewImagePath: '',
    previewImageModel: null as File | null,
    uploadedImagesModel: [] as Array<File>,
    uploadedImages: [] as Array<File>,
    equipments: [] as Array<Equipment>,
    type_id: 0,
    is_published: [0] as Array<number>
  }
  formData = {
    id: -1,
    name: '',
    description: '',
    area: 0,
    price_per_metr: 0,
    equipments: [] as Array<number>,
    price: 0,
    type_id: null as null | number,
    img_path: null as File | string | null,
    photo: [] as Array<File> | Array<string>,
    latitude: null as null | number,
    longitude: null as null | number,
    newPhoto: [] as Array<File>,
    short_description:  '',
    created_at:  null as string | null,
    updated_at: null as string | null,
    discount_sum: 0,
    is_published: false
  }
  formDataForPreview = {}
  types = [] as Array <RealtyType>
  get mainTabName(): string { return this.$route.meta.isCreatePage ? 'Создание' : 'Редактирование' }
  get totalPrice(): number { return Math.ceil((this.formData.area as number ) * (this.formData.price_per_metr as number) - this.formData.discount_sum) }
  get uploadedIMageNames(): string { return this.temp.uploadedImages.map(value => value.name).join(', ') }
  get sliderImagesToDisplay (): Array<File|string> {
    if (this.isCreatePage) {
      return this.formData.photo
    } else {
      return [...this.formData.photo, ...this.temp.uploadedImages]
    }
  }

  updateEquipments (): void {
    Equipment.getList({ realtyTypeId: this.formData.type_id as number }).then(response => {
      this.equipments = response.data
      if (this.formData.type_id === this.temp.type_id) {
        this.$nextTick(() => {
          this.formData.equipments = this.temp.equipments.map(equip => equip.id as number)
        })
      }
    })
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
    let request

    this.$v.$touch()

    if (!this.$v.$invalid) {
      if (this.isCreatePage) {
        request = Realty.create(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({ title: 'Запись успешно создана', variant: 'success' })
              this.$router.push({ name: 'admin.realty.change', params: { id: response.data.id as unknown as string } })
              this.$v.$reset()
            })
      } else {
        request = Realty.update(this.formData)
            .then((response) => {
              this.initFormData(response.data)
              getModule(Notification, this.$store).setData({ title: 'Запись успешно изменена', variant: 'success' })
              this.$v.$reset()
            })
      }
      request.then(() => {
        if (redirect) {
          if (this.$route.query.pathAfterSubmit) this.$router.push(this.$route.query.pathAfterSubmit as string)
          else this.$router.push({ name: 'admin.realty' })
        }
      })
    } else {
      getModule(Notification, this.$store).setData({ title: 'Ошибка валидации!', text: 'Проверте корректность и запоолненость полей', variant: 'danger' })
    }
  }

  initFormData (realty: Realty): void {
    this.temp = { type_id: realty.type_id as number, is_published: realty.is_published ? [1] : [],  equipments: realty.equipments as Array<Equipment>, center: [realty.latitude as number, realty.longitude as number], uploadedImages: [], uploadedImagesModel: [], previewImagePath: realty.img_path as string, previewImageModel: null}

    this.$nextTick(() => {
      this.formData = {...this.formData, ...realty, equipments: realty.equipments?.map(value => value.id) as Array<number>, is_published: realty.is_published as boolean}
      this.formData.newPhoto = []
      this.formData.img_path = realty.img_path as string
      this.formData.type_id = realty.type_id as number
      this.formData.photo = realty.photo as Array<string>
    })
  }

  @Watch('formData.description')
  watchFormDataDescription(desc: string, oldDesc: string): void {
    desc = removeHtmlTags(desc)
    oldDesc = removeHtmlTags(oldDesc)

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
  @Watch('formData.type_id')
  watchFormDataTypeId(): void {
    this.updateEquipments()
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
  @Watch('temp.is_published')
  watchTempIsPublished(value: Array<number>): void {
    this.formData.is_published = !!value.length
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

    const realtyTypeName = this.types.find(value => value.id === (Number(this.formData.type_id)))

    this.formDataForPreview = {
      ...this.formData,
      img_path: this.temp.previewImagePath,
      photo,
      realtyTypeName: realtyTypeName ? realtyTypeName.name : '',
      equipments: this.equipments.reduce((acc, equip) => {
        if (this.formData.equipments.includes(equip.id as number)) return [...acc, equip]
        else return acc
      }, [] as Array<Equipment>)
    }
  }
  @Watch('$route.meta.isCreatePage', { immediate: true })
  watchIsCreatePage(isCreatePage: boolean): void {
    if (!isCreatePage) {
      Realty.get(({ id: Number(this.$route.params.id) }))
          .then(response => {
            this.initFormData(response.data)
          })
    }
  }

  created (): void {
    RealtyType.getList().then(response => {
      this.types = response.data
    })
    this.updateEquipments()
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

@import "~@/assets/stylus/fonts.styl"
@import "~@/assets/stylus/text-editor.styl"
::v-deep .text-editor
  .ql-editor
    font-family Inter-Regular
</style>
