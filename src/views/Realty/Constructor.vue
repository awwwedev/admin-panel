<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-nav tabs class="mb-3" >
      <b-nav-item :active="activeTab === 0" @click="activeTab = 0">{{ mainTabName }}</b-nav-item>
      <b-nav-item :active="activeTab === 1" @click="activeTab = 1">Предпросмотр карточек</b-nav-item>
      <b-nav-item :active="activeTab === 2" @click="activeTab = 2">Предпросмотр страницы</b-nav-item>
    </b-nav>
    <b-form v-if="activeTab === 0">
      <b-card class="mb-3 shadow-sm" header="Описание">
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
        <b-form-group label="Дополнительно"
                      label-for="equipment"
        >
          <b-select
              id="equipment"
              v-model="selectedEquipments"
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
      <b-card class="mb-3 shadow-sm" header="Основное изображение">
        <UploadedImage :image="formData.img_path" @imageInitialized="imgPreviewPath = $event"/>
        <b-file browse-text="Обзор..."
                v-model="formData.img_path"
        >
          <template #placeholder>
            Нет файлов
          </template>
        </b-file>
      </b-card>
      <b-card class="mb-3 shadow-sm" header="Изображения для слайдера">
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
      <b-card class="mb-3 shadow-sm" header="Карта">
        <yandex-map :coords="center"
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
              :key="imgPreviewPath"
          >
            <Balloon slot="balloon"
                     :area="formData.area"
                     :description="formData.description"
                     :img-path="imgPreviewPath"
                     :name="formData.name"
                     :price="formData.price_per_metr"
                     :id="formData.id"
                     disable-link
            />
          </ymap-marker>

        </yandex-map>
        <div class="pt-3">
          <p>Широта: {{ formData.latitude }}</p>
          <p>Долгота: {{ formData.longitude }}</p>
        </div>
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
    <PreviewTab2 v-if="activeTab === 1"
                 :form-data="formDataForPreview"
                 :key="imgPreviewPath"
    />
  </div>
</template>

<script lang="ts">
// @ts-ignore
import {yandexMap, ymapMarker} from "vue-yandex-maps";
import {Component, Mixins, Watch} from "vue-property-decorator";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import {required} from "vuelidate/lib/validators";
import UploadedImage from "@/components/UploadedImage.vue";
import bus from "@/common/bus";
import Balloon from "@/components/RealtyCard2.vue";
import PreviewTab2 from "@/views/Realty/PreviewTab2.vue";


type equipment = {
  id: string,
  name: string
}

@Component({
  components: {PreviewTab2, UploadedImage, yandexMap, ymapMarker, Balloon},
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
  },
  data: () => ({
    bus
  })
})
export default class Constructor extends Mixins<Validation>(validationMixin, ValidationMixin) {
  center = [44.583460, 33.482296]
  zoom = 19
  allowSetNameByDesc = true
  imgPreviewPath = ''
  activeTab = 0
  selectedEquipments = [] as Array<equipment>
  tempPhotos = []
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
  formData = {
    id: -1,
    name: '',
    description: '',
    area: 0,
    price_per_metr: 0,
    price: 0,
    type_id: '',
    img_path: null,
    photo: [] as Array<File>,
    latitude: 0,
    longitude: 0
  }
  formDataForPreview = {}
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

  get isCreatePage(): boolean { return this.$route.meta.isCreatePage }
  get pageName(): string { return this.$route.meta.isCreatePage ? 'Создание новой недвижимости' : 'Редактирование недвижимости' }
  get mainTabName(): string { return this.$route.meta.isCreatePage ? 'Создание' : 'Редактирование' }
  get totalPrice(): number { return this.formData.area * this.formData.price_per_metr }
  get uploadedIMageNames(): string { return this.formData.photo.map(value => value.name).join(', ') }
  get equipmentsForAddToFormData(): { [key: string]: number } {
    return this.equipments.reduce((acc, value) => {
      acc[value.id as string] = 0

      return acc
    }, {} as { [key: string]: number })
  }

  onDeleteUploadedImage(image: File): void {
    this.formData.photo = this.formData.photo.filter(value => value.name !== image.name && value.lastModified !== image.lastModified)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  onMapClick (e: any): void {
    const coords = e.get('coords')

    this.formData.latitude = coords[0] as number
    this.formData.longitude = coords[1] as number
  }

  @Watch('formData.description')
  watchFormDataDescription(desc: string, oldDesc: string): void {
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
  watchTotalPrice(price: number): void {
    this.formData.price = price
  }
  @Watch('tempPhotos')
  watchTempPhotos(files: Array<File>): void {
    this.formData.photo = [...this.formData.photo, ...files]
  }
  @Watch('selectedEquipments')
  watchSelectedEquipments(equipments: Array<string>): void {
    const equipmentsSelected = equipments.reduce((acc, value) => {
      acc[value] = 1

      return acc
    }, {} as { [key: string]: number })

    this.formData = {...this.formData, ...this.equipmentsForAddToFormData, ...equipmentsSelected}
  }
  @Watch('imgPreviewPath')
  @Watch('formData', { immediate: true, deep: true })
  watchFormData (): void {
    this.formDataForPreview = {
      ...this.formData,
      img_path: this.imgPreviewPath
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
