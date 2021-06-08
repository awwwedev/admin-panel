<template>
  <div class="w-75 mx-auto">
    <b-card class="mt-3 shadow-sm">
      <PerfectScrollbar class="ps" ref="ps">
        <b-media v-for="message in messages" :key="message.id">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="mt-0">{{ message.author }}</h5>
            <b-badge variant="primary" pill>{{ message.created_at }}</b-badge>
          </div>
          <p v-html="message.message"/>
        </b-media>
      </PerfectScrollbar>
    </b-card>
    <b-card class="mt-3 shadow-sm">
      <b-form-group label="Сообщеие"
                    label-for="description"
      >
        <vue-editor class="text-editor" id="textarea" v-model.trim="formData.message"
                    :editor-toolbar="customToolbar"/>
      </b-form-group>
      <b-button variant="primary">
        Отправить
      </b-button>
    </b-card>
  </div>
</template>

<script lang="ts">
import {Component, Ref, Vue} from "vue-property-decorator";
import User from "@/models/User";
import TicketMessage from "@/models/TicketMessage";
// @ts-ignore
import {VueEditor} from 'vue2-editor'


@Component({
  components: {VueEditor},
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
export default class Chat extends Vue {
  @Ref('ps') $rePs!: Vue
  messages = [] as Array<TicketMessage>
  formData = {
    message: ''
  }


  created(): void {
    User.getMessages({ user_id: Number(this.$route.params.id), sortType: 'desc', fortField: 'created_at' })
        .then(res => {
          this.messages = res.data
          this.$nextTick(() => {
            this.$rePs.$el.scrollTop = this.$rePs.$el.clientHeight
          })
        })
  }
}
</script>

<style scoped lang="stylus">
.ps
  max-height 500px
</style>