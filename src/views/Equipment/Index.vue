<template>
  <EntityIndexPageLayout :columns="columns"
                         :items="items"
                         page-title="Комплектации"
                         :selected-all-rows="selectedAllRows" :selected="selected"
                         route-name-change="admin.equipment.change" route-name-create="admin.equipment.create"
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
    <template #cell(name)="{ item }">
      <b-link :to="{ name: 'admin.equipment.change', params: { id: item.id } }" v-html="item.name"/>
    </template>
    <template #cell(actions)="{ item }">
      <b-button variant="info" :to="{ name: 'relationship.equipments', params: { id: item.id } }">Недвижимость</b-button>
    </template>
  </EntityIndexPageLayout>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import TableStateController from "@/mixins/tableStateController";
import SearchHelpers from "@/mixins/searchHelpers";
import {AxiosResponse} from "axios";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import Equipment from "@/models/Equipment";
import ItemsCountInfo from "@/components/ItemsCountInfo.vue";
import ModalDeletingConfirm from "@/components/ModalDeletingConfirm.vue";
import EntityIndexPageLayout from "@/components/EntityIndexPageLayout.vue";


@Component({
  components: {EntityIndexPageLayout, ModalDeletingConfirm, ItemsCountInfo}
})
export default class IndexRealtyType extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
  columns = [
    {
      key: 'selected',
      label: ''
    },
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      searchable: true
    },
    {
      key: 'realtyTypeName',
      label: 'Тип',
      sortable: true,
      searchable: true
    },
    {
      key: 'name',
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
    },
    {
      key: 'actions',
      label: ''
    }
  ]
  items = [] as Array<Equipment>

  onDelete (): void {
    Equipment.destroy(this.selected.map(value => value.id as number)).then(() => {
      getModule(Notification, this.$store).setData({ title: 'Удаление прошло успешно', variant: 'success' })
      this.updateTableData();
    }).catch(err => {
      const {
        id,
        message,
        allowCheckRelations
      }: { id: string | null, message: string | null, allowCheckRelations: boolean } = err.response.data

      getModule(Notification, this.$store).setData({
        title: message as string, variant: 'danger',
        links: allowCheckRelations ? [
          {
            label: 'Просмотреть зависимости',
            routeName: 'relationship.equipments',
            params: {
              id: id as string
            }
          }
        ] : []
      })
    })
  }

  updateTableData(): Promise<AxiosResponse<Array<Equipment>>> {
    return Equipment.getList(this.tableOptionsCleared)
        .then(response => {
          this.items = response.data

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
