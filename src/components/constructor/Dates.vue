<template>
  <b-card class="mb-3 shadow-sm" header="Дата создания и изменения" v-if="formData.created_at && formData.updated_at">
    <b-row cols-sm="2" cols-md="2">
      <b-col>
        <b-form-group label="Создан"
                      disabled
        >
          <b-form-input :value="formData.created_at"/>
        </b-form-group>
      </b-col>
      <b-col>

        <b-form-group label="Изменен"
                      disabled
        >
          <b-form-input :value="formData.updated_at"/>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class Dates extends Vue {
  @Prop({type: Object, required: true}) formData!: { created_at?: string, updated_at?: string }
}
</script>

<style scoped lang="stylus">

</style>