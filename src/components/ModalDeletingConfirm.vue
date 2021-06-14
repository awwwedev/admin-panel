<template>
  <div class="">
    <b-modal title="Подтвердение удаления" :visible="show" @close="onClose">
      <template #default>
        <slot>
          Вы действительно хотите удалить эти записи?
        </slot>
      </template>
      <template #modal-footer>
        <b-button type="button" variant="primary" @click="onConfirm">Подтвердить</b-button>
        <b-button type="button" variant="secondary" @click="onCancel">Отмена</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";


@Component({})
export default class ModalDeletingConfirm extends Vue {
  @Prop({ required: true, type: Boolean }) show!: boolean

  @Emit('close') onClose (): void { return }
  @Emit('confirm') onConfirm (): void { return }
  @Emit('cancel') onCancel (): void { return }
}
</script>

<style scoped>

</style>