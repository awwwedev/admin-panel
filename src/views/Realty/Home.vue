<template>
  <div class="section">
    <h1 class="mb-5">Недвижимость</h1>
    <b-card class="mb-4 shadow-sm">
      <div class="d-flex">
        <b-button variant="primary" class="mr-2" :to="{ name: 'admin.realty.create' }">Создать</b-button>
        <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
        <b-button variant="danger" class="my-2 my-sm-0" :disabled="selectedAllRows">Удалить выбранное</b-button>
      </div>
    </b-card>
    <b-card class="shadow-sm">
      <b-form inline class="mb-3" @submit.prevent="omSearch">
        <b-form-input v-model="tableTemp.searchValue" class="mr-sm-2" placeholder="Поиск"></b-form-input>
        <b-select v-model="tableTemp.searchField" class="mr-sm-3">
          <b-select-option :value="null">
            --- Выберите поле для поиска ---
          </b-select-option>
          <b-select-option v-for="(field, idx) in fields"
                           v-if="field.searchable"
                           :key="idx"
                           :value="field.key"
          >
            {{ field.label }}
          </b-select-option>
        </b-select>
        <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit">Найти</b-button>
      </b-form>
      <b-table
          :fields="fields"
          :items="items"
          responsive="md"
          select-mode="multi"
          striped
          hover
          selectable
          @row-selected="onRowSelected"
          @sort-changed="onChangeSort"
          ref="table"
          :busy="inRequestState"
      >
        <template #cell(selected)="{ rowSelected }">
          <template v-if="rowSelected">
            <span>&check;</span>
          </template>
          <template v-else>
            <span>&nbsp;</span>
          </template>
        </template>
        <template #cell(name)="{ item }">
          <b-link :to="{ name: 'admin.realty.change', params: { id: item.id } }" v-html="tableOptions.searchValue ? getValueWithSearchPart(item.name, tableOptions.searchValue) : item.name "></b-link>
        </template>
        <template #cell(actions)="{ item }">
          <b-button-group>
            <b-button variant="warning" class="my-2 my-sm-0" @click="$router.replace({ name: 'admin.realty.change', params: { id: item.id } })">Изменить</b-button>
            <b-button variant="danger" class="my-2 my-sm-0" @click="onDeleteTableItem(item)">Удалить</b-button>
          </b-button-group>
        </template>
      </b-table>
      <div class="d-flex justify-content-between align-items-center">
        <b-pagination
            v-model="tableOptions.page"
            :total-rows="tableInfo.totalItems"
            :per-page="tableOptions.perPage"
        />

        <b-select v-model="tableTemp.perPage" style="width: auto">
          <b-select-option :value="10">
            10
          </b-select-option>
          <b-select-option :value="25">
            25
          </b-select-option>
          <b-select-option :value="50">
            50
          </b-select-option>
          <b-select-option :value="75">
            75
          </b-select-option>
          <b-select-option :value="100">
            100
          </b-select-option>
          <b-select-option :value="'all'">
            ВСЕ
          </b-select-option>
        </b-select>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import Realty from "@/models/Realty";
import TableStateController from "@/mixins/tableStateController";
import {AxiosResponse} from "axios";
import {responseWithPaginator, tableItem} from "@/common/types";
import SearchHelpers from "@/mixins/searchHelpers";


@Component({
})
export default class Home extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
  fields = [
    {
      key: 'selected',
      label: 'Выбрано'
    },
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      searchable: true
    },
    {
      key: 'name',
      label: 'Описание',
      searchable: true,
      sortable: true,
    },
    {
      key: 'realtyTypeName',
      label: 'Тип',
      searchable: true
    },
    {
      key: 'area',
      label: 'Площадь',
      sortable: true,
      searchable: true
    },
    {
      key: 'price',
      label: 'Стоимость',
      sortable: true,
      searchable: true
    },
    {
      key: 'created_at',
      label: 'Создан',
      sortable: true,
      searchable: true
    },
    {
      key: 'actions',
      label: 'Действия'
    }
  ]
  items = [] as Array<Realty>

  get selectionBtnText (): string { return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все' }

  updateTableData(): Promise<AxiosResponse<responseWithPaginator<Realty>>> {
    return Realty.getList(this.tableOptionsCleared)
        .then(response => {
          this.items = response.data.data

          return response
        })
  }

  onDeleteTableItem(items: tableItem): void {
    console.log(items)
  }
}
</script>

<style scoped lang="stylus">

</style>
