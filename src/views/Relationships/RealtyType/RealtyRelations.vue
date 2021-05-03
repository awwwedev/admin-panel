<template>
  <b-card header="Недвижимость" class="mb-4 shadow-sm">
    <div class="mb-2">
      <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
      <b-button variant="danger" class="my-2 my-sm-0" :disabled="!selected.length" @click="onDelete">Удалить
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
      <template #cell(img_path)="{ item }">
        <b-img fluid width="150" :src="basePath + item.img_path"/>
      </template>
      <template #cell(name)="{ item }">
        <b-link :to="{ name: 'admin.realty.change', params: { id: item.id } }">{{ item.name }}</b-link>
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
</template>

<script lang="ts">
import {Component, Inject, Mixins, Prop} from "vue-property-decorator";
import TableStateController from "@/mixins/tableStateController";
import Realty from "@/models/Realty";
import {AxiosResponse} from "axios";
import {responseWithPaginator} from "@/common/types";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import ItemsCountInfo from "@/components/ItemsCountInfo.vue";

@Component({
  components: {ItemsCountInfo}
})
export default class RealtyRelations extends Mixins<TableStateController>(TableStateController) {
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
      key: 'price_per_metr',
      label: 'Стоимость за м. кв.',
      sortable: true,
      searchable: true
    },
    {
      key: 'created_at',
      label: 'Создан',
      sortable: true,
      searchable: true
    }
  ]
  items = [] as Array<Realty>
  @Inject('basePath') basePath!: string
  @Prop( { required: true, type: Number } ) typeId!: number

  get selectionBtnText(): string { return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все' }


  updateTableData(): Promise<AxiosResponse<responseWithPaginator<Realty>>> {
    return Realty.getList({...this.tableOptionsCleared, types: [this.typeId]})
        .then(response => {
          this.items = response.data.data

          return response
        })
  }

  onDelete(): void {
    Realty.destroy(this.selected.map(value => value.id as number)).then(() => {
      getModule(Notification, this.$store).setData({title: 'Удаление прошло успешно', variant: 'success'})
      this.updateTableData();
    })
  }
}
</script>

<style scoped>

</style>