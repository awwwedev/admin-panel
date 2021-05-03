<template>
  <b-card header="Комплектация" class="mb-4 shadow-sm">
    <div class="mb-2">
      <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
      <b-button variant="danger" class="my-2 my-sm-0" :disabled="!selected.length" @click="onDeleteEquips">
        Удалить
        выбранное
      </b-button>
    </div>
    <b-table
        sort-icon-left
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
        <b-link :to="{ name: 'admin.equipment.change', params: { id: item.id } }">{{ item.name }}</b-link>
      </template>
    </b-table>
    <ItemsCountInfo :total="items.length"/>
  </b-card>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from "vue-property-decorator";
import TableStateController from "@/mixins/tableStateController";
import Equipment from "@/models/Equipment";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import {AxiosResponse} from "axios";
import ItemsCountInfo from "@/components/ItemsCountInfo.vue";

@Component({
  components: {ItemsCountInfo}
})
export default class EquipmentsRelations extends Mixins<TableStateController>(TableStateController) {
  items = [] as Array<Equipment>
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
  @Prop( { required: true, type: Number } ) typeId!: number

  get selectionBtnText (): string { return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все' }

  updateTableData(): Promise<AxiosResponse<Array<Equipment>>> {
    return Equipment.getList({realtyTypeId: this.$route.params.id})
        .then(res => {
          this.items = res.data

          return res
        })
  }

  onDeleteEquips(): void {
    Equipment.destroy(this.selected.map(value => value.id as number)).then(() => {
      getModule(Notification, this.$store).setData({title: 'Удаление прошло успешно', variant: 'success'})

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
}
</script>

<style scoped>

</style>