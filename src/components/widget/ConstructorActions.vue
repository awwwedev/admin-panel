<template>
  <div class="d-flex mb-5">
    <template v-if="isCreatePage">
      <b-button variant="primary" class="mr-2" @click.prevent="onSubmit(false)">Создать</b-button>
      <b-button :to="cancelTo" variant="secondary">Отмена</b-button>
    </template>
    <template v-else>
      <b-button variant="primary" class="mr-2" @click.prevent="onSubmit">Сохранить</b-button>
      <b-button variant="success" class="mr-2" @click.prevent="onSubmit(false)">Применить</b-button>
      <b-button :to="cancelTo" class="mr-2" variant="secondary">Отмена</b-button>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from "vue-property-decorator";


@Component({

})
export default class ConstructorActions extends Vue {
  @Prop({ required: true, type: Boolean }) isCreatePage!: boolean
  @Prop({ required: true, type: Object }) cancelTo!: { name: string }

  @Emit('submit')
  onSubmit (redirect = true): boolean {
    return redirect
  }
}
</script>

<style scoped>

</style>
