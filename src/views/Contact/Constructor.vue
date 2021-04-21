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
                        :disabled="formData.is_rent_department === 1"
                        v-model.trim="formData.header"
                        :state="getFieldState($v.formData.header)"
          />
        </b-form-group>
        <b-form-group label="Значение"
                      label-for="value"
                      :invalid-feedback="getValidationMessage($v.formData.value)"
        >
          <b-form-input id="value"
                        v-model.trim="formData.value"
                        :state="getFieldState($v.formData.value)"
          />
        </b-form-group>
        <b-form-group label="Тип"
                      label-for="type"
                      :invalid-feedback="getValidationMessage($v.formData.type)"
        >
          <b-select
              id="type"
              v-model="formData.type"
              :state="getFieldState($v.formData.type)"
              :disabled="formData.is_rent_department === 1"
          >
            <b-select-option v-for="(type, idx) in types"
                             :key="idx"
                             :value="type.id"
            >
              {{ type.name }}
            </b-select-option>
          </b-select>
        </b-form-group>
        <b-form-group label-for="is_rent_department">
            <b-checkbox :checked="formData.is_rent_department === 1" id="is_rent_department"
                        @change="formData.is_rent_department = formData.is_rent_department === 1 ? 0 : 1"
            >
              Контак филиала
            </b-checkbox>
        </b-form-group>
      </b-card>
    </b-form>
    <ConstructorActions :cancel-to="{ name: 'admin.contact' }" :is-create-page="isCreatePage" @submit="onSubmit"/>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from "vue-property-decorator";
import ConstructorHelpers from "@/mixins/constructorHelpers";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import {required, requiredIf} from "vuelidate/lib/validators";
import ConstructorActions from "@/components/widget/ConstructorActions.vue";
import UploadedImage from "@/components/UploadedImage.vue";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import Contact from "@/models/Contact";
import Dates from "@/components/constructor/Dates.vue";


type type = {
  id: string,
  name: string
}
@Component({
  components: {Dates, UploadedImage, ConstructorActions},
  validations() {
    return {
      formData: {
        header: {
          // @ts-ignore
          requiredIf: requiredIf(() => !this.formData.is_rent_department)
        },
        value: {
          required
        },
        type: {
          required
        },
      },
    }
  }
})
export default class Constructor extends Mixins<Validation, ValidationMixin, ConstructorHelpers>(validationMixin, ValidationMixin, ConstructorHelpers) {
  entityName = 'слайда'
  types = [
    {
      id: 'email',
      name: 'Почта'
    },
    {
      id: 'phone',
      name: 'Телефон'
    }
  ] as Array<type>
  formData = {
    id: null as null | number,
    header: '' as null | string,
    type: '',
    value: '',
    is_rent_department: 1
  }

  onSubmit (): void {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      if (this.isCreatePage) {
        Contact.create(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно создана', variant: 'success'})
              this.$router.push({name: 'admin.contact.change', params: {id: response.data.id as unknown as string}})
            })
      } else {
        Contact.update(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно изменена', variant: 'success'})
              this.updateFormData(response.data)
            })
      }

    }
  }

  updateFormData(contact: Contact): void {
    this.formData = { header: contact.header as string, value: contact.value as string, id: contact.id as number, type: contact.type as string, is_rent_department: Number(contact.is_rent_department) }
  }

  created (): void {
    if (!this.isCreatePage) {
      Contact.get(({ id: Number(this.$route.params.id) }))
          .then(response => {
            this.updateFormData(response.data)
          })
    } else {
      this.formData.type = this.types[0].id
    }
  }

  @Watch('formData.is_rent_department')
  watchFormDataDepart (val: number): void {
    if (val) {
      this.formData.type = this.types[1].id
      this.formData.header = null
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

