<template>
  <b-row class="h-100 align-items-center justify-content-center m-0">
    <b-col sm="12" md="8">
      <b-container>
        <b-form class="w-50 mx-auto" @submit.prevent="onSubmit">
          <b-form-group
              id="email"
              label="Почта"
              label-for="email"
              :invalid-feedback="getValidationMessage($v.formData.email)"
          >
            <b-form-input
                id="email"
                v-model="formData.email"
                type="email"
                :state="getFieldState($v.formData.email)"
            />
          </b-form-group>
          <b-form-group
              id="password"
              label="Пароль"
              label-for="password"
              :invalid-feedback="getValidationMessage($v.formData.password)"
          >
            <b-form-input
                id="password"
                v-model="formData.password"
                type="password"
                :state="getFieldState($v.formData.password)"
            />
          </b-form-group>
          <b-button-group>
            <b-button variant="primary" type="submit">
              Вход
            </b-button>
          </b-button-group>
        </b-form>
      </b-container>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import {Validation, validationMixin} from "vuelidate";
import {required, email} from "vuelidate/lib/validators"
import ValidationMixin from "@/mixins/validation"
import {getModule} from "vuex-module-decorators";
import UserModule from "@/store/modules/user";
import Notification from "@/store/modules/notification";
import store from "@/store";


@Component({
  validations: {
    formData: {
      email: {
        required,
        email
      },
      password: {
        required
      },
    }
  }
})
export default class Login extends Mixins<Validation>(validationMixin, ValidationMixin) {
  formData = {
    email: '',
    password: ''
  }

  onSubmit(): void {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      getModule(UserModule, this.$store).login(this.formData).catch(() => {
        getModule(Notification, store).setData({ text: 'Не верный логин или пароль!', title: 'Ошибка авторизации', variant: 'danger' })
      })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
