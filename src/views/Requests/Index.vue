<template>
    <EntityIndexPageLayout :columns="columns"
                           :items="items"
                           page-title="Заявки на аренду"
                           with-paginate
                           disable-creation-btn
                           :selected-all-rows="selectedAllRows" :selected="selected"
                           route-name-change="admin.order.change" route-name-create="admin.order.create"
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
        <template #cell(email)="{ item }">
            <b-link v-if="item.email" :to="{ name: 'admin.order.change', params: { id: item.id } }" v-html="item.email"></b-link>
        </template>
        <template #cell(new)="{ item }">
            <b-badge v-if="item.new === 0" variant="secondary">Просмотрено</b-badge>
            <b-badge v-else-if="item.new === 1" variant="success">Новое</b-badge>
        </template>
        <template #cell(phone)="{ item }">
            <b-link v-if="item.phone" :to="{ name: 'admin.order.change', params: { id: item.id } }" v-html="item.phone"></b-link>
        </template>
    </EntityIndexPageLayout>
</template>

<script lang="ts">
  import {Component, Inject, Mixins} from "vue-property-decorator";
  import TableStateController from "@/mixins/tableStateController";
  import {responseWithPaginator} from "@/common/types";
  import SearchHelpers from "@/mixins/searchHelpers";
  import {AxiosResponse} from "axios";
  import {getModule} from "vuex-module-decorators";
  import Notification from "@/store/modules/notification";
  import ItemsCountInfo from "@/components/ItemsCountInfo.vue";
  import SearchPanel from "@/components/SearchPanel.vue";
  import ModalDeletingConfirm from "@/components/ModalDeletingConfirm.vue";
  import EntityIndexPageLayout from "@/components/EntityIndexPageLayout.vue";
  import Requests from "@/models/Requests";


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
        key: 'email',
        label: 'Почта',
          searchable: true,
          sortable: true,
      },
      {
        key: 'phone',
        label: 'Номер телефона',
        searchable: true,
        sortable: true,
      },
      {
        key: 'message',
        label: 'Сообщение',
          searchable: true,
          sortable: true,
      },
      {
        key: 'new',
        label: 'Статус',
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
    items = [] as Array<Requests>

    onDelete(): void {
      Requests.destroy(this.selected.map(value => value.id as number)).then(() => {
        getModule(Notification, this.$store).setData({title: 'Удаление прошло успешно', variant: 'success'})
        this.updateTableData();
      })
    }

    updateTableData(): Promise<AxiosResponse<responseWithPaginator<Requests>>> {
      return Requests.getList(this.tableOptionsCleared)
        .then(response => {
          this.items = response.data.data

          return response
        })
    }

      mounted(): void {
          this.$table = this.$refLayout.$table
          this.tableOptions.sortBy = 'new'
          this.tableOptions.sortType = 'DESC'
      }
  }
</script>

<style scoped>

</style>
