<template>
  <b-card class="mb-3 shadow-sm" header="Недвижимость">
    <b-row cols-sm="1" cols-md="3">
      <b-col cols="12" md="6">
        <b-list-group v-if="objects.length">
          <b-list-group-item v-for="object in objects" :key="object.id">
            <div class="d-flex align-items-center justify-content-between">
              <span class="mr-2">{{ object.name }} : {{ object.id_1c }}</span>
              <b-button variant="danger" @click="onRemove(object)">Удалить</b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
        <h4 v-else>У пользователя пока нет недвижимости</h4>
      </b-col>
      <b-col cols="12" md="6">
        <b-row>
          <b-col>
            <b-form-group label="Идентификатор" label-for="object-id"
                          :invalid-feedback="getValidationMessage($v.formData.id_1c)"
            >
              <b-input v-model="formData.id_1c" id="object-id"
                       :state="getFieldState($v.formData.id_1c)"
                       @input="$v.formData.id_1c.$touch()"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Название" label-for="object-name"
                          :invalid-feedback="getValidationMessage($v.formData.name)"
            >
              <b-input v-model="formData.name" id="object-name"
                       :state="getFieldState($v.formData.name)"
                       @input="$v.formData.name.$touch()"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="primary" @click="onAdd" :disabled="$v.$error">Добавить</b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
  import {Component, InjectReactive, Mixins, Prop} from "vue-property-decorator";
  import RealtyObject from "@/models/1c/RealtyObject";
  import UserModel from "@/models/User";
  import {Validation, validationMixin} from "vuelidate";
  import ValidationMixin from "@/mixins/validation";
  import {required} from "vuelidate/lib/validators";
  import {getModule} from "vuex-module-decorators";
  import Notification from "@/store/modules/notification";


  @Component({
    validations() {
      return {
        formData: {
          name: {
            required
          },
          id_1c: {
            required
          }
        }
      }
    }
  })
  export default class Objects1c extends Mixins<Validation, ValidationMixin>(validationMixin, ValidationMixin) {
    @Prop({ required: true, type: Array }) value!: Array<number>
    @InjectReactive('userData') userData!: UserModel
    objects = [] as Array<RealtyObject>
    formData = {
      name: '',
      id_1c: ''
    }

    onRemove(object: RealtyObject): void {
      RealtyObject.destroy({ id: object.id as number })
        .then(() => {
          this.updatedData()
          this.updateState()
        })
    }
    onAdd(): void {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        RealtyObject.create({ user_id: this.userData.id as number, ...this.formData })
          .then(() => {
            this.updatedData()
            this.updateState()
          })
      } else {
        getModule(Notification, this.$store).setData({
          title: 'Ошибка валидации!',
          text: 'Проверте корректность и запоолненость полей',
          variant: 'danger'
        })
      }
    }

    updateState(): void {
      this.formData = {
        name: '',
        id_1c: ''
      }

      this.$v.$reset()
    }
    updatedData(): void {
      RealtyObject.getList({ user_id: this.userData.id as number })
        .then(res => { this.objects = res.data })
    }

    created(): void {
      this.updatedData()
    }
  }
</script>

<style scoped>

</style>