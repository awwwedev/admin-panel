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
        <b-form-group label="Тип"
                      label-for="type"
                      :invalid-feedback="getValidationMessage($v.formData.realty_type_id)"
        >
          <b-select
              id="type"
              v-model="formData.realty_type_id"
              :state="getFieldState($v.formData.realty_type_id)"
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
      </b-card>
    </b-form>
    <ConstructorActions :cancel-to="{ name: 'admin.equipment' }" :is-create-page="isCreatePage" @submit="onSubmit"/>
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
import Equipment from "@/models/Equipment";
import Dates from "@/components/constructor/Dates.vue";


@Component({
  components: {Dates, UploadedImage, ConstructorActions},
  validations: {
    formData: {
      name: {
        required
      },
      realty_type_id: {
        required
      }
    }
  }
})
export default class Constructor extends Mixins<Validation, ValidationMixin, ConstructorHelpers>(validationMixin, ValidationMixin, ConstructorHelpers) {
  entityName = 'комплектация недвижимости'
  types = [] as Array<RealtyType>

  formData = {
    id: null as null | number,
    name: '',
    realty_type_id: null as null | number
  }

  onSubmit(redirect = true): void {
    let request

    this.$v.$touch()

    if (!this.$v.$invalid) {
      if (this.isCreatePage) {
        request = Equipment.create(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно создана', variant: 'success'})
              this.$router.push({name: 'admin.equipment.change', params: {id: response.data.id as unknown as string}})
            })
      } else {
        request = Equipment.update(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно изменена', variant: 'success'})
              this.updateFormData(response.data)
            })
      }
      request.then(() => {
        if (redirect) {
          this.$router.push({name: 'admin.equipment'})
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

  updateFormData (equipment: Equipment): void {
    this.formData = { name: equipment.name as string, id: equipment.id as number, realty_type_id: equipment.realty_type_id as number }
  }

  created(): void {
    RealtyType.getList().then(response => {
      this.types = response.data
    })
  }

  @Watch('$route.meta.isCreatePage', { immediate: true })
  watchIsCreatePage(isCreatePage: boolean): void {
    if (!isCreatePage) {
      Equipment.get({id: this.$route.params.id as unknown as number})
          .then(response => this.updateFormData(response.data))
    }
  }
}
</script>

<style scoped>

</style>
