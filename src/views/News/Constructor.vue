<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-nav tabs class="mb-3" >
      <b-nav-item :active="activeTab === 0" @click="activeTab = 0">{{ mainTabName }}</b-nav-item>
      <b-nav-item :active="activeTab === 1" @click="activeTab = 1">Предпросмотр карточек</b-nav-item>
    </b-nav>
    <b-form v-if="activeTab === 0">
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
                      :invalid-feedback="getValidationMessage($v.formData.content)"
        >
          <vue-editor class="text-editor" id="textarea" v-model.trim="formData.content"
                      :editor-toolbar="customToolbar" :class="{ 'is-invalid': $v.formData.content.$error }"/>
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
      <ConstructorActions :cancel-to="{ name: 'admin.news' }" :is-create-page="isCreatePage" @submit="onSubmit"/>
    </b-form>
    <PreviewTab v-else-if="activeTab === 1" :form-data="formData"/>
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
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
// @ts-ignore
import {VueEditor} from 'vue2-editor'
import Dates from "@/components/constructor/Dates.vue";
import PreviewTab from "@/views/News/PreviewTab.vue";


@Component({
  components: {PreviewTab, Dates, UploadedImage, ConstructorActions, VueEditor},
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
      short_description: {
        required
      },
    },
  },
  data: () => ({
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
  entityNameCreate = 'Создание новости'
  entityNameChange = 'Изменение новости'
  activeTab = 0
  formData = {
    id: null as null | number,
    header: '',
    content: '',
    short_description: '',
    photo: null as File | string | null,
    created_at:  null as string | null,
    updated_at: null as string | null
  }
  temp = {
    previewImagePath: '',
    previewImageModel: null as File | null,
  }
  get mainTabName(): string { return this.$route.meta.isCreatePage ? 'Создание' : 'Редактирование' }

  onSubmit(redirect = true): void {
    let request

    this.$v.$touch()

    if (!this.$v.$invalid) {
      if (this.isCreatePage) {
        request = News.create(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно создана', variant: 'success'})
              this.$router.push({name: 'admin.news.change', params: {id: response.data.id as unknown as string}})
              this.$v.$reset()
            })
      } else {
        request = News.update(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно изменена', variant: 'success'})
              this.updateFormData(response.data)
              this.$v.$reset()
            })
      }
      request.then(() => {
        if (redirect) {
          this.$router.push({ name: 'admin.realty' })
        }
      })

    } else {
      getModule(Notification, this.$store).setData({ title: 'Ошибка валидации!', text: 'Проверте корректность и запоолненость полей', variant: 'danger' })
    }
  }

  updateFormData(news: News): void {
    this.temp = {previewImageModel: null, previewImagePath: news.photo as string}
    this.formData = {
      content: news.content as string,
      header: news.header as string,
      id: news.id as number,
      photo: news.photo as string,
      short_description: news.short_description as string,
      created_at: news.created_at as string,
      updated_at: news.updated_at as string
    }
  }

  @Watch('temp.previewImageModel')
  watchTempPreviewImageModel(file: File): void {
    if (!file) return

    this.formData.photo = file
  }

  @Watch('$route.meta.isCreatePage', { immediate: true })
  watchIsCreatePage(isCreatePage: boolean): void {
    if (!isCreatePage) {
      News.get(({id: Number(this.$route.params.id)}))
          .then(response => {
            this.updateFormData(response.data)
          })
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/stylus/fonts.styl"
@import "~@/assets/stylus/text-editor.styl"
.images-grid
  display grid
  grid-template-columns repeat(3, 1fr)
  grid-column-gap 10px
  grid-row-gap 10px

.map
  height 600px
  width auto

::v-deep .text-editor
  .ql-editor
    font-family Inter-Regular
</style>

