<template>
  <b-container>
    <h1 class="mb-5">Недвижимость</h1>
    <b-card class="mb-4 shadow-sm">
      <div class="d-flex">
        <b-button variant="primary" class="mr-2">Создать</b-button>
        <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
        <b-button variant="danger" class="my-2 my-sm-0" :disabled="selected.length === 0">Удалить выбранное</b-button>
      </div>
    </b-card>
    <b-card class="shadow-sm">
      <b-form inline class="mb-3">
        <b-form-input class="mr-sm-2" placeholder="Поиск"></b-form-input>
        <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit">Найти</b-button>
      </b-form>
      <b-table
          :fields="fields"
          :items="items"
          responsive="sm"
          select-mode="multi"
          striped
          hover
          selectable
          @row-selected="onRowSelected"
          ref="table"
      >
        <template #cell(selected)="{ rowSelected }">
          <template v-if="rowSelected">
            <span>&check;</span>
          </template>
          <template v-else>
            <span>&nbsp;</span>
          </template>
        </template>
        <template #cell(object)="{ item }">
          <b-link :to="{ name: 'admin.realty' }">{{ item.object }}</b-link>
        </template>
        <template #cell(actions)="{ item }">
          <b-button-group>
            <b-button variant="warning" class="my-2 my-sm-0" @click="$router.replace({ name: 'admin.realty' })">Изменить</b-button>
            <b-button variant="danger" class="my-2 my-sm-0" @click="onDeleteTableItem(item)">Удалить</b-button>
          </b-button-group>
        </template>
      </b-table>
      <div class="text-secondary mb-3">
        5 / 100
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <b-pagination/>

        <b-select value="10" style="width: auto">
          <b-select-option value="10">
            10
          </b-select-option>
          <b-select-option value="25">
            25
          </b-select-option>
          <b-select-option value="50">
            50
          </b-select-option>
          <b-select-option value="75">
            75
          </b-select-option>
          <b-select-option value="100">
            100
          </b-select-option>
          <b-select-option value="all">
            ВСЕ
          </b-select-option>
        </b-select>
      </div>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import {Component, Vue, Ref} from "vue-property-decorator";
import {BTable} from "bootstrap-vue";


type tableItem = { object: string, first_name: string, last_name: string }

@Component({})
export default class Home extends Vue {
  fields = [
    {
      key: 'selected',
      label: 'Выбрано'
    },
    {
      key: 'object',
      label: 'Объект'
    },
    {
      key: 'first_name',
      label: 'first_name'
    },
    {
      key: 'last_name',
      label: 'last_name'
    },
    {
      key: 'actions',
      label: 'Действия'
    }
  ]
  items = [
    {object: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, sequi.', first_name: 'Dickerson', last_name: 'Macdonald'},
    {object: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, sequi.', first_name: 'Larsen', last_name: 'Shaw'},
    {object: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, sequi.', first_name: 'Geneva', last_name: 'Wilson',},
    {object: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, sequi.', first_name: 'Thor', last_name: 'MacDonald',},
    {object: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, sequi.', first_name: 'Dick', last_name: 'Dunlap'}
  ]
  selected: Array<tableItem> = []
  selectedAllRows = false

  @Ref('table') $table!: BTable

  get selectionBtnText (): string { return this.selectedAllRows ? 'Убрать выделение' : 'Выбрать все' }

  onSelectAll(): void {
    if (this.selectedAllRows) {
      this.$table.clearSelected()
      this.selectedAllRows = false
    } else {
      this.$table.selectAllRows()
      this.selectedAllRows = true
    }
  }
  onRowSelected(items: Array<tableItem>): void {
    this.selected = items
  }
  onDeleteTableItem(items: tableItem): void {
    console.log(items)
  }
}
</script>

<style scoped lang="stylus">

</style>
