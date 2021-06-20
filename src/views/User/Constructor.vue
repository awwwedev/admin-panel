<template>
  <div class="section">
    <h1 class="mb-5">{{ pageName }}</h1>
    <b-form>
      <Dates :form-data="formData"/>
      <b-card class="mb-3 shadow-sm" header="ФИО">
        <b-row cols-sm="1" cols-md="3">
          <b-col>
            <b-form-group label="Фамилия"
                          label-for="surname"
                          :invalid-feedback="getValidationMessage($v.temp.surname)"
            >
              <b-form-input id="surname"
                            v-model.trim="temp.surname"
                            :state="getFieldState($v.temp.surname)"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Имя"
                          label-for="name"
                          :invalid-feedback="getValidationMessage($v.temp.name)"
            >
              <b-form-input id="name"
                            v-model.trim="temp.name"
                            :state="getFieldState($v.temp.name)"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Отчество"
                          label-for="patronymic"
                          :invalid-feedback="getValidationMessage($v.temp.patronymic)"
            >
              <b-form-input id="patronymic"
                            v-model.trim="temp.patronymic"
                            :state="getFieldState($v.temp.patronymic)"
              />
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label="ФИО"
                          label-for="fio"
                          :invalid-feedback="getValidationMessage($v.formData.name)"
            >
              <b-form-input id="fio"
                            v-model.trim="formData.name"
                            :state="getFieldState($v.formData.name)"
                            disabled
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card class="mb-3 shadow-sm" header="Личные данные">
        <b-row cols-sm="1" cols-md="2">
          <b-col>
            <b-form-group label="Номер телефона"
                          label-for="phone"
                          :invalid-feedback="getValidationMessage($v.formData.phone)"
            >
              <b-form-input id="phone"
                            v-model.trim="formData.phone"
                            type="tel"
                            :state="getFieldState($v.formData.phone)"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Email"
                          label-for="email"
                          :invalid-feedback="getValidationMessage($v.formData.email)"
            >
              <b-form-input id="name"
                            type="email"
                            v-model.trim="formData.email"
                            :state="getFieldState($v.formData.email)"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card class="mb-3 shadow-sm" header="Пароль и роль">
        <b-row cols-sm="1" cols-md="3">
          <b-col>
            <b-form-group label-for="role" label="Роль">
              <b-select
                id="role_id"
                v-model="formData.role_id"
                :state="getFieldState($v.formData.role_id)"
              >
                <b-select-option v-for="(role, idx) in rolesPrepared"
                                 :key="idx"
                                 :value="role.id"
                >
                  {{ role.displayName }}
                </b-select-option>
              </b-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Пароль"
                          label-for="pass"
                          type="text"
                          :invalid-feedback="getValidationMessage($v.formData.password)"
                          :description="isCreatePage ? '' : 'Для сохранения текщего пароля оставьте пустым'"
            >
              <b-form-input id="pass"
                            v-model.trim="formData.password"
                            :state="getFieldState($v.formData.password)"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <Objects1c v-if="false" v-model="formData.objects"/>
    </b-form>
    <ConstructorActions :cancel-to="{ name: 'admin.user' }" :is-create-page="isCreatePage" @submit="onSubmit"/>
  </div>
</template>

<script lang="ts">
  import {Component, Mixins, ProvideReactive, Watch} from "vue-property-decorator";
  import ConstructorHelpers from "@/mixins/constructorHelpers";
  import {Validation, validationMixin} from "vuelidate";
  import ValidationMixin from "@/mixins/validation";
  import {required, email, requiredIf, minLength} from "vuelidate/lib/validators";
  import ConstructorActions from "@/components/widget/ConstructorActions.vue";
  import UploadedImage from "@/components/UploadedImage.vue";
  import {getModule} from "vuex-module-decorators";
  import Notification from "@/store/modules/notification";
  import Dates from "@/components/constructor/Dates.vue";
  import User from "@/models/User";
  import {Role} from "@/models/Role";
  import {capitalize} from "@/common/utils";
  import Objects1c from "@/components/parts/user/Objects1c.vue";


  @Component({
    components: {Objects1c, Dates, UploadedImage, ConstructorActions},
    validations() {
      return {
        temp: {
          name: {
            required
          },
          patronymic: {
            required
          },
          surname: {
            required
          }
        },
        formData: {
          email: {
            required,
            email
          },
          name: {
            required
          },
          phone: {
            required
          },
          role_id: {
            required
          },
          password: {
            minLength: minLength(6),
            requiredIf: requiredIf(() => {
              return this.$route.meta.isCreatePage
            }),
          },
        },
      }

    }
  })
  export default class Constructor extends Mixins<Validation, ValidationMixin, ConstructorHelpers>(validationMixin, ValidationMixin, ConstructorHelpers) {
    entityNameCreate = 'Создание пользователя'
    entityNameChange = 'Изменение пользователя'
    roles = [] as Array<Role>
    @ProvideReactive('userData') formData = {
      id: null as null | number,
      name: '',
      email: '',
      phone: '',
      password: '' as string | null,
      role_id: null as null | number,
      created_at: null as string | null,
      updated_at: null as string | null,
      objects: [] as Array<string>
    }
    temp = {
      surname: '',
      name: '',
      patronymic: ''
    }

    get rolesPrepared(): Array<{ id: number, displayName: string }> {
      return this.roles.map(role => {
        return {
          // @ts-ignore
          ...role, displayName: {
            TENANT: 'Арендатор',
            ADMIN: 'Администратор'
          }[role.role as string] || ''
        }
      }) as Array<{ id: number, displayName: string }>
    }

    onSubmit(redirect = true): void {
      let request
      this.$v.$touch()

      if (!this.$v.$invalid) {
        if (this.isCreatePage) {
          request = User.create(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно создана', variant: 'success'})
              this.$router.push({name: 'admin.user.change', params: {id: response.data.id as unknown as string}})
              this.$v.$reset()
            })
        } else {
          request = User.update(this.formData)
            .then((response) => {
              getModule(Notification, this.$store).setData({title: 'Запись успешно изменена', variant: 'success'})
              this.updateFormData(response.data)
              this.$v.$reset()
            })
        }
        request.then(() => {
          if (redirect) {
            this.$router.push({name: 'admin.user'})
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

    updateFormData(user: User): void {
      const [name, patronymic, surname] = user.name?.split(' ') as Array<string>
      this.temp = {name, patronymic, surname}
      this.formData = {
        name: user.name as string,
        id: user.id as number,
        email: user.email as string,
        phone: user.phone as string,
        role_id: user.role_id as number,
        password: '',
        objects: (user.objects || []).map(object => object.id_1c) as Array<string>,
        created_at: user.created_at as string,
        updated_at: user.updated_at as string
      }
    }

    @Watch('temp', {deep: true})
    watchTempPreviewImageModel({name, patronymic, surname}: { surname: string, name: string, patronymic: string }): void {
      this.formData.name = `${capitalize(surname || '')} ${capitalize(name || '')} ${capitalize(patronymic || '')}`
    }

    @Watch('$route.meta.isCreatePage', {immediate: true})
    watchIsCreatePage(isCreatePage: boolean): void {
      Role.getList().then((res) => {
        this.roles = res.data
      })

      if (!isCreatePage) {
        User.get(({id: Number(this.$route.params.id)}))
          .then(response => {
            this.updateFormData(response.data)
          })
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>

