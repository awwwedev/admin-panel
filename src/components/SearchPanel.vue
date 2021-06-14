<template>
  <b-form inline class="mb-3" @reset="onReset">
    <b-form-input v-model="searchValue" class="mr-sm-2 mt-2" placeholder="Поиск" :disabled="!searchField"></b-form-input>
    <b-select v-model="searchField" class="mr-sm-3 mt-2">
      <b-select-option :value="null">
        --- Выберите поле для поиска ---
      </b-select-option>
      <b-select-option v-for="(field, idx) in columns"
                       v-if="field.searchable"
                       :key="idx"
                       :value="field.key"
      >
        {{ field.label }}
      </b-select-option>
    </b-select>
    <div class="d-flex mt-2">
      <b-button v-if="!withoutButtonSubmit" variant="outline-primary" class="mr-1" type="button" @click="searching" :disabled="!searchField">Найти</b-button>
      <b-button v-if="!withoutButtonReset" variant="outline-danger" class="" type="reset" :disabled="!searchField">Сбросить</b-button>
    </div>
  </b-form>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";
import {tableColumn} from "@/common/types";

@Component({})
export default class SearchPanel extends Vue {
  searchField = null as null | string
  searchValue = ''
  @Prop({ required: true, type: Array }) columns!: Array<tableColumn>
  @Prop({ required: true }) value!: string
  @Prop({ required: false, type: Boolean, default: false }) withoutButtonSubmit!: boolean
  @Prop({ required: false, type: Boolean, default: false }) withoutButtonReset!: boolean

  onReset(): void {
    if (!this.searchField) return

    this.searchValue = ''
    this.searchField = null

    this.changedValue()
    this.searching()
  }

  @Emit('changedField')
  changedField(): string {
    return this.searchField as string
  }
  @Emit('input')
  changedValue(): string {
    return this.searchValue
  }
  @Emit('search')
  searching(): void {
    return
  }

  @Watch('searchField')
  watchSearchField(): void {
    this.changedField()
  }
  @Watch('searchValue')
  watchSearchValue(): void {
    this.changedValue()
  }
  @Watch('value', { immediate: true })
  watchValue(): void {
    this.searchValue = this.value
  }
}
</script>

<style scoped>

</style>