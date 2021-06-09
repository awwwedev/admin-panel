<template>
  <div class="mx-auto chat">
    <b-card class="mt-3 shadow-sm">
      <PerfectScrollbar class="ps" ref="ps">
        <b-list-group ref="message-container">
          <b-list-group-item v-for="message in messages" :key="message.id">
            <b-media>
              <div class="d-flex justify-content-between align-items-start">
                <h5 class="mt-0">{{ message.author }}</h5>
                <b-badge variant="primary" pill>{{ message.created_at }}</b-badge>
              </div>
              <p v-html="message.message"/>
            </b-media>
          </b-list-group-item>
        </b-list-group>
      </PerfectScrollbar>
    </b-card>
    <b-card class="mt-3 shadow-sm" ref="text-editor-container">
      <b-form-group label="Сообщеие"
                    label-for="description"
                    :invalid-feedback="getValidationMessage($v.formData.message)"
      >
        <vue-editor class="text-editor" id="textarea" v-model.trim="formData.message" ref="text-editor"
                    @input="$v.formData.message.$touch()"
                    :editor-toolbar="customToolbar" :class="{ 'is-invalid': $v.formData.message.$error }"/>
      </b-form-group>
      <b-button variant="primary" class="mr-1" @click="onSendMessage">
        Отправить
      </b-button>
      <b-button variant="secondary" :to="{ name: 'admin.user' }">
        Назад
      </b-button>
    </b-card>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Ref, Vue} from "vue-property-decorator";
import TicketMessage from "@/models/TicketMessage";
// @ts-ignore
import {VueEditor} from 'vue2-editor'
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import {required} from "vuelidate/lib/validators";
import $ from 'jquery'


@Component({
  components: {VueEditor},
  validations: {
    formData: {
      message: {
        required
      }
    },
  },
  data: () => ({
    customToolbar: [[{
      header: [false, 2, 3, 4, 5, 6]
    }], ["bold", "italic", "underline", "strike"],
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
export default class Chat extends Mixins<Validation, ValidationMixin>(validationMixin, ValidationMixin) {
  @Ref('ps') $refPs!: Vue
  @Ref('message-container') $refMessageContainer!: HTMLElement
  @Ref('text-editor') $refTextEditor!: Vue
  messages = [] as Array<TicketMessage>
  formData = {
    message: ''
  }

  updateState(): void {
    this.formData.message = ''
    this.$v.$reset()

    TicketMessage.getList({ ticket_user_id: Number(this.$route.params.id), sortType: 'desc', sortField: 'created_at' })
        .then(res => {
          this.messages = res.data
          $(this.$refPs.$el).height(window.innerHeight * 0.40)
          $(this.$refTextEditor.$el).find('#textarea').height(window.innerHeight * 0.20)

          this.$nextTick(() => {
            console.log(this.$refMessageContainer.clientHeight)
            this.$refPs.$el.scrollTop = this.$refMessageContainer.clientHeight
          })
        })

  }

  onSendMessage(): void {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      TicketMessage.create({ ticket_user_id: Number(this.$route.params.id), ...this.formData }).then(() => {
        getModule(Notification, this.$store).setData({title: 'Сообщение успешно отправлено', variant: 'success', direction: 1 })
        this.updateState()
      })
    } else {
      getModule(Notification, this.$store).setData({title: 'Заполните сообщение', variant: 'danger', direction: 1 })
    }
  }

  mounted(): void {
    this.updateState()
  }
}
</script>

<style scoped lang="stylus">
.chat
  width 75%
</style>