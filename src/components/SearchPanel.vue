<template>
  <b-form inline class="mb-3">
    <b-form-input v-model="searchValue" class="mr-sm-2" placeholder="Поиск" :disabled="!searchField"></b-form-input>
    <b-select v-model="searchField" class="mr-sm-3">
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
    <b-button variant="outline-primary" class="my-2 my-sm-0" type="button" @click="searching" :disabled="!searchField">Найти</b-button>
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
  @Prop({ required: true, type: String }) value!: string

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