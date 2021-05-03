<template>
  <div class="section">
    <h1 class="mb-5">Комплектация</h1>

    <b-card class="mb-4 shadow-sm">
      <div class="d-flex">
        <b-button variant="primary" class="mr-2" :to="{ name: 'admin.equipment.create' }">Создать</b-button>
        <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
        <b-button variant="danger" class="my-2 my-sm-0" :disabled="!selected.length" @click="onDelete">Удалить выбранное</b-button>
      </div>
    </b-card>
    <b-card class="shadow-sm">
      <b-table
          :fields="fields"
          :items="items"
          responsive="md"
          select-mode="multi"
          striped
          hover
          selectable
          sort-icon-left
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
          <b-link :to="{ name: 'admin.equipment.change', params: { id: item.id } }" v-html="tableOptions.searchValue ? getValueWithSearchPart(item.name, tableOptions.searchValue) : item.name "></b-link>
        </template>
      </b-table>
      <ItemsCountInfo :total="items.length"/>
    </b-card>
  </div>
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


@Component({
  components: {ItemsCountInfo}
})
export default class IndexRealtyType extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
  fields = [
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
    }
  ]
  items = [] as Array<Equipment>

  get selectionBtnText (): string { return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все' }

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
}
</script>

<style scoped>

</style>
