<template>
  <b-modal title="Подтвердение удаления" :visible="show" @close="$emit('close')">
    <template #default>
      Вы действительно хотите удалить эти записи?
      <slot/>
    </template>
    <template #modal-footer>
      <b-button type="button" variant="primary" @click="$emit('confirm')">Подтвердить</b-button>
      <b-button type="button" variant="secondary" @click="$emit('cancel')">Отмена</b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class ModalDeletingConfirm extends Vue {
  @Prop({ required: true, type: Boolean }) show!: boolean
}
</script>

<style scoped>

</style>