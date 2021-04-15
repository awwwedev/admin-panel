<template>
  <div class="section">
    <h1 class="mb-5">Категория недвижимости</h1>

    <b-card class="mb-4 shadow-sm">
      <div class="d-flex">
        <b-button variant="primary" class="mr-2" :to="{ name: 'admin.news.create' }">Создать</b-button>
        <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
        <b-button variant="danger" class="my-2 my-sm-0" :disabled="!selectedAllRows" @click="onDelete">Удалить выбранное</b-button>
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
        <template #cell(header)="{ item }">
          <b-link :to="{ name: 'admin.news.change', params: { id: item.id } }" v-html="tableOptions.searchValue ? getValueWithSearchPart(item.header, tableOptions.searchValue) : item.header "></b-link>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import TableStateController from "@/mixins/tableStateController";
import {responseWithPaginator} from "@/common/types";
import SearchHelpers from "@/mixins/searchHelpers";
import {AxiosResponse} from "axios";
import News from "@/models/News";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";


@Component({

})
export default class Index extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
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
      key: 'header',
      label: 'Название',
      searchable: true,
      sortable: true,
    }
  ]
  items = [] as Array<News>

  get selectionBtnText (): string { return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все' }

  onDelete (): void {
    News.destroy(this.selected.map(value => value.id as number)).then(() => {
      getModule(Notification, this.$store).setData({ title: 'Удаление прошло успешно', variant: 'success' })
      this.updateTableData();
    })
  }

  updateTableData(): Promise<AxiosResponse<responseWithPaginator<News>>> {
    return News.getList(this.tableOptionsCleared)
        .then(response => {
          this.items = response.data.data

          return response
        })
  }
}
</script>

<style scoped>

</style>
