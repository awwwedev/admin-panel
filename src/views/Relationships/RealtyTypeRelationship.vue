<template>
<b-container>
  <h1 class="mb-4 mt-2" v-if="realtyType">Зависимыости типа недвижимости &laquo;{{ realtyType.name }}&raquo;</h1>
  <b-card header="Комплектация" class="mb-4 shadow-sm">
    <div class="mb-2">
      <b-button variant="info" class="mr-3" @click="onSelectAllEquips">{{ selectionBtnText }}</b-button>
      <b-button variant="danger" class="my-2 my-sm-0" :disabled="!selectedEquips.length" @click="onDeleteEquips">Удалить
        выбранное
      </b-button>
    </div>
    <b-table
        sort-icon-left
        :fields="fieldsEquips"
        :items="equips"
        responsive="md"
        select-mode="multi"
        striped
        hover
        selectable
        @row-selected="onRowEquipsSelected"
        ref="tableEquips"
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
  </b-card>
  <b-card header="Недвижимость" class="mb-4 shadow-sm">
    <div class="mb-2">
      <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
      <b-button variant="danger" class="my-2 my-sm-0" :disabled="!selected.length" @click="onDelete">Удалить
        выбранное
      </b-button>
    </div>
    <b-table
        sort-icon-left
        :fields="fieldsRealty"
        :items="realty"
        responsive="md"
        select-mode="multi"
        striped
        hover
        selectable
        @row-selected="onRowSelected"
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
</b-container>
</template>

<script lang="ts">
import {Component, Mixins, Ref} from "vue-property-decorator";
import Realty from "@/models/Realty";
import Equipment from "@/models/Equipment";
import TableStateController from "@/mixins/tableStateController";
import {AxiosResponse} from "axios";
import {responseWithPaginator, tableItem} from "@/common/types";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import {BTable} from "bootstrap-vue";
import RealtyType from "@/models/RealtyType";

@Component({
})
export default class RealtyTypeRelationship extends Mixins<TableStateController>(TableStateController) {
  realty = [] as Array<Realty>
  equips = [] as Array<Equipment>
  basePath = process.env.VUE_APP_URL
  selectedEquips = [] as Array<tableItem>
  realtyType = null as null | RealtyType
  fieldsRealty = [
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
    },
    {
      key: 'realtyTypeName',
      label: 'Тип',
    },
    {
      key: 'area',
      label: 'Площадь'
    },
    {
      key: 'price',
      label: 'Стоимость'
    },
    {
      key: 'price_per_metr',
      label: 'Стоимость за м. кв.'
    },
    {
      key: 'created_at',
      label: 'Создан'
    }
  ]
  fieldsEquips = [
    {
      key: 'selected',
      label: ''
    },
    {
      key: 'id',
      label: 'ID'
    },
    {
      key: 'realtyTypeName',
      label: 'Тип'
    },
    {
      key: 'name',
      label: 'Название',
    }
  ]
  selectedAllEquipsRows = false

  @Ref('tableEquips') $tableEquips!: BTable

  get selectionBtnText(): string {
    return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все'
  }

  onRowEquipsSelected(items: Array<tableItem>): void {
    this.selectedEquips = items
  }

  onSelectAllEquips (): void {
    if (this.selectedAllEquipsRows) {
      this.$tableEquips.clearSelected()
      this.selectedAllEquipsRows = false
    } else {
      this.$tableEquips.selectAllRows()
      this.selectedAllEquipsRows = true
    }
  }

  onDeleteEquips(): void {
    Equipment.destroy(this.selectedEquips.map(value => value.id as number)).then(() => {
      getModule(Notification, this.$store).setData({ title: 'Удаление прошло успешно', variant: 'success' })
      this.updateTableData();
    })
  }

  updateTableData(): Promise<AxiosResponse<responseWithPaginator<Realty>>> {
    return Realty.getList({ ...this.tableOptionsCleared, equipments: [ this.$route.params.id ] })
        .then(response => {
          this.realty = response.data.data

          return response
        })
  }

  onDelete(): void {
    Realty.destroy(this.selected.map(value => value.id as number)).then(() => {
      getModule(Notification, this.$store).setData({title: 'Удаление прошло успешно', variant: 'success'})
      this.updateTableData();
    })
  }

  created (): void {
    Equipment.getList({ realtyTypeId: this.$route.params.id })
        .then(res => {
          this.equips = res.data
        })
    RealtyType.get({ id: this.$route.params.id as unknown as number })
        .then(res => {
          this.realtyType = res.data
        })
  }
}
</script>

<style scoped>

</style>