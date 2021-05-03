<template>
  <div class="section">
    <h1 class="mb-5">Тип недвижимости</h1>

    <b-card class="mb-4 shadow-sm">
      <div class="d-flex">
        <b-button variant="primary" class="mr-2" :to="{ name: 'admin.realtyType.create' }">Создать</b-button>
        <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
        <b-button variant="danger" class="my-2 my-sm-0" :disabled="!selected.length" @click="onDelete">Удалить
          выбранное
        </b-button>
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
          sort-icon-left
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
          <b-link :to="{ name: 'admin.realtyType.change', params: { id: item.id } }"
                  v-html="item.name "></b-link>
        </template>
        <template #cell(img_path)="{ item }">
          <b-img fluid width="150" :src="basePath + item.img_path"/>
        </template>
      </b-table>
      <ItemsCountInfo :total="items.length"/>
    </b-card>
  </div>
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

  get selectionBtnText(): string {
    return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все'
  }

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
}
</script>

<style scoped>

</style>
