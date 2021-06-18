<template>
  <EntityIndexPageLayout :columns="columns"
                         :items="items"
                         page-title="Типы недвижимости"
                         :selected-all-rows="selectedAllRows" :selected="selected"
                         route-name-change="admin.realtyType.change" route-name-create="admin.realtyType.create"
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
      <b-link :to="{ name: 'admin.realtyType.change', params: { id: item.id } }"
              v-html="item.name "></b-link>
    </template>
    <template #cell(img_path)="{ item }">
      <b-img fluid width="150" :src="basePath + item.img_path"/>
    </template>
  </EntityIndexPageLayout>
</template>

<script lang="ts">
import {Component, Inject, Mixins} from "vue-property-decorator";
import TableStateController from "@/mixins/tableStateController";
import RealtyType from "@/models/RealtyType";
import SearchHelpers from "@/mixins/searchHelpers";
import {AxiosResponse} from "axios";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
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
      key: 'img_path',
      label: ''
    },
    {
      key: 'id',
      label: 'ID',
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
    }
  ]
  items = [] as Array<RealtyType>
  @Inject('basePath') basePath!: string

  onDelete(): void {
    RealtyType.destroy(this.selected.map(value => value.id as number))
        .then(() => {
          getModule(Notification, this.$store).setData({title: 'Удаление прошло успешно', variant: 'success'})
          this.updateTableData();
        })
        .catch((err => {
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
                routeName: 'relationship.realtyType',
                params: {
                  id: id as string
                }
              }
            ] : []
          })
        }))
  }

  updateTableData(): Promise<AxiosResponse<Array<RealtyType>>> {
    return RealtyType.getList(this.tableOptionsCleared)
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
