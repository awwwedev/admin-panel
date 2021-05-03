<template>
  <div class="section">
    <h1 class="mb-5">Новости</h1>

    <b-card class="mb-4 shadow-sm">
      <div class="d-flex">
        <b-button variant="primary" class="mr-2" :to="{ name: 'admin.news.create' }">Создать</b-button>
        <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
        <b-button variant="danger" class="my-2 my-sm-0" :disabled="!selected.length" @click="onDelete">Удалить выбранное</b-button>
      </div>
    </b-card>
    <b-card class="shadow-sm">
      <SearchPanel :columns="fields" @changedField="tableTemp.searchField = $event" v-model="tableTemp.searchValue" @search="onSearch"/>
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
          sort-icon-left
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
        <template #cell(photo)="{ item }">
          <b-img fluid width="150" :src="basePath + item.photo"/>
        </template>
        <template #cell(header)="{ item }">
          <b-link :to="{ name: 'admin.news.change', params: { id: item.id } }" v-html="item.header "></b-link>
        </template>
      </b-table>
      <ItemsCountInfo :info="itemsCountInfo" :total="tableInfo.totalItems"/>
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
import {Component, Inject, Mixins} from "vue-property-decorator";
import TableStateController from "@/mixins/tableStateController";
import {responseWithPaginator} from "@/common/types";
import SearchHelpers from "@/mixins/searchHelpers";
import {AxiosResponse} from "axios";
import News from "@/models/News";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import ItemsCountInfo from "@/components/ItemsCountInfo.vue";
import SearchPanel from "@/components/SearchPanel.vue";


@Component({
  components: {SearchPanel, ItemsCountInfo}
})
export default class Index extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
  @Inject('basePath') basePath!: string
  fields = [
    {
      key: 'selected',
      label: ''
    },
    {
      key: 'photo',
      label: ''
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
    },
    {
      key: 'created_at',
      label: 'Создан',
      sortable: true,
    },
    {
      key: 'updated_at',
      label: 'Изменен',
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
