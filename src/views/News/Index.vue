<template>
    <EntityIndexPageLayout :columns="columns"
                           :items="items"
                           page-title="Новости"
                           with-paginate
                           :selected-all-rows="selectedAllRows" :selected="selected"
                           route-name-change="admin.news.change" route-name-create="admin.news.create"
                           :in-request-state="inRequestState"
                           :table-info="tableInfo" :table-temp="tableTemp"
                           :update-items-collback="updateTableData"
                           @deleteItem="onDelete"
                           @changeSort="onChangeSort"
                           @selectAll="onSelectAll"
                           @rowSelected="onRowSelected"
                           @search="onSearch"
                           :items-count-info="itemsCountInfo"
                           :table-options="tableOptions"
                           ref="EntityIndexPageLayout"
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
    </EntityIndexPageLayout>
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
  import ModalDeletingConfirm from "@/components/ModalDeletingConfirm.vue";
  import EntityIndexPageLayout from "@/components/EntityIndexPageLayout.vue";


  @Component({
    components: {EntityIndexPageLayout, ModalDeletingConfirm, SearchPanel, ItemsCountInfo}
  })
  export default class Index extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
    @Inject('basePath') basePath!: string
    columns = [
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

    onDelete(): void {
      News.destroy(this.selected.map(value => value.id as number)).then(() => {
        getModule(Notification, this.$store).setData({title: 'Удаление прошло успешно', variant: 'success'})
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

      mounted(): void {
          this.$table = this.$refLayout.$table
      }
  }
</script>

<style scoped>

</style>
