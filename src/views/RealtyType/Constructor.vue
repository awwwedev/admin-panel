<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-form>
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
    </b-form>
    <ConstructorActions :cancel-to="{ name: 'admin.realtyType' }" :is-create-page="isCreatePage" @submit="onSubmit"/>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import ConstructorHelpers from "@/mixins/constructorHelpers";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import {required} from "vuelidate/lib/validators";
import ConstructorActions from "@/components/widget/ConstructorActions.vue";


@Component({
  components: {ConstructorActions},
  validations: {
    formData: {
      name: {
        required
      }
    }
  }
})
export default class Constructor extends Mixins<Validation, ValidationMixin, ConstructorHelpers>(validationMixin, ValidationMixin, ConstructorHelpers) {
  entityName = 'типа недвижимости'

  formData = {
    id: null as null | number,
    name: ''
  }

  onSubmit (): void {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      console.log(123)
    }
  }
}
</script>

<style scoped>

</style>
