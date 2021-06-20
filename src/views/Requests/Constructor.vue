<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-form >
      <Dates :form-data="formData"/>
      <b-card class="mb-3 shadow-sm" header="Основное">
        <b-row >
          <b-col md="6" sm="12">
            <b-form-group label="Почта"
                          label-for="email"
            >
              <b-form-input id="email"
                            disabled
                            v-model.trim="formData.email"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Номер телефона"
                          label-for="phone"
            >
              <b-form-input id="phone"
                            disabled
                            v-model.trim="formData.phone"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-form-group label="Собщение"
                      label-for="short_description"
        >
          <b-textarea id="short_description"
                      disabled
                        v-model.trim="formData.message"
          />
        </b-form-group>
        <b-link v-if="formData.realtie_id" :to="{ name: 'admin.realty.change', params: { id: formData.realtie_id }, query: { pathToBack: $route.fullPath, pathAfterSubmit: $route.fullPath } }">Недвижимость</b-link>
        <b-badge variant="danger" v-else>Недвижимость была удалена</b-badge>
      </b-card>
      <b-checkbox v-model="temp.checked" :value="1" :unchecked-value="0">Просмотрено</b-checkbox>
      <ConstructorActions :cancel-to="{ name: 'admin.order' }" :is-create-page="isCreatePage" @submit="onSubmit"/>
    </b-form>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from "vue-property-decorator";
import ConstructorHelpers from "@/mixins/constructorHelpers";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import ConstructorActions from "@/components/widget/ConstructorActions.vue";
import UploadedImage from "@/components/UploadedImage.vue";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import Dates from "@/components/constructor/Dates.vue";
import Requests from "@/models/Requests";


@Component({
  components: { Dates, UploadedImage, ConstructorActions},
  validations: {
    formData: {
    }
  },
  data: () => ({
  })
})
export default class Constructor extends Mixins<Validation, ValidationMixin, ConstructorHelpers>(validationMixin, ValidationMixin, ConstructorHelpers) {
  entityNameChange = 'Просмотр завки на аренду'
  formData = {
    id: null as null | number,
    phone: '',
    email: '',
    message: '',
    realtie_id: null as null | number,
    new: 0,
    created_at:  null as string | null,
    updated_at: null as string | null
  }
  temp = {
    checked: [1]
  }

  onSubmit(redirect = true): void {
    let request

    this.$v.$touch()

    if (!this.$v.$invalid) {
      request = Requests.update({ ...this.formData, new: this.temp.checked[0] })
        .then((response) => {
          getModule(Notification, this.$store).setData({title: 'Запись успешно изменена', variant: 'success'})
          this.updateFormData(response.data)
          this.$v.$reset()
        })
      request.then(() => {
        if (redirect) {
          this.$router.push({ name: 'admin.order' })
        }
      })

    } else {
      getModule(Notification, this.$store).setData({ title: 'Ошибка валидации!', text: 'Проверте корректность и запоолненость полей', variant: 'danger' })
    }
  }

  updateFormData(request: Requests): void {
    this.temp.checked = [1]

    this.formData = {
      id: request.id as number,
      message: request.message as string,
      realtie_id: request.realtie_id as number,
      phone: request.phone as string,
      email: request.email as string,
      new: request.new as number,
      created_at: request.created_at as string,
      updated_at: request.updated_at as string
    }
  }

  @Watch('$route.meta.isCreatePage', { immediate: true })
  watchIsCreatePage(isCreatePage: boolean): void {
    if (!isCreatePage) {
      Requests.get(({id: Number(this.$route.params.id)})).then(response => { this.updateFormData(response.data) })
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

