<template>
  <EntityIndexPageLayout :columns="columns"
                         :items="items"
                         page-title="Недвижимость"
                         with-paginate
                         :selected-all-rows="selectedAllRows" :selected="selected"
                         route-name-change="admin.slide.change" route-name-create="admin.slide.create"
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
    <template #cell(img_path)="{ item }">
      <b-img fluid width="150" :src="basePath + item.img_path"/>
    </template>
    <template #cell(is_published)="{ item }">
      <b-badge v-if="item.is_published" variant="success">Опубликовано</b-badge>
      <b-badge v-else variant="danger">Неопубликовано</b-badge>
    </template>
    <template #cell(name)="{ item }">
      <b-link :to="{ name: 'admin.realty.change', params: { id: item.id } }" v-html="item.name"></b-link>
    </template>

    <template #filters>
      <b-form class="mb-3" @submit.prevent="onSearch" @reset.prevent="onReset">
        <SearchPanel without-button-submit without-button-reset :columns="columns" @changedField="tableTemp.searchField = $event" v-model="tableTemp.searchValue"/>
        <b-form-group label="Комплектация">
          <b-form-checkbox-group>
            <b-form-checkbox v-for="(equip, idx) in equipments" :key="idx"
                             v-model="tableOptionsRealty.equipments"
                             :value="equip.id">
              {{ equip.name }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-group label="Тип">
          <b-form-checkbox-group>
            <b-form-checkbox v-for="(type, idx) in types" :key="idx"
                             v-model="tableOptionsRealty.types"
                             :value="type.id">
              {{ type.name }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-group label="Стоимость (руб.)" :description="`${tableOptionsRealty.priceMin} / ${realtyMinMax.priceMax}`">
          <b-input type="range" v-model="tableOptionsRealty.priceMin" :min="realtyMinMax.priceMin"
                   :max="realtyMinMax.priceMax"/>
        </b-form-group>
        <b-form-group label="Площадь (м. кв.)" :description="`${tableOptionsRealty.areaMin} / ${realtyMinMax.areaMax}`">
          <b-input type="range" v-model="tableOptionsRealty.areaMin" :min="realtyMinMax.areaMin" :max="realtyMinMax.areaMax"/>
        </b-form-group>
        <b-form-group label="Стоимость за м. кв. (руб. / м. кв.)"
                      :description="`${tableOptionsRealty.pricePerMetrMin} / ${realtyMinMax.pricePerMetrMax}`">
          <b-input type="range" v-model="tableOptionsRealty.pricePerMetrMin" :min="realtyMinMax.pricePerMetrMin"
                   :max="realtyMinMax.pricePerMetrMax"/>
        </b-form-group>
        <b-button variant="outline-primary" class="mr-1" type="submit">Найти</b-button>
        <b-button variant="outline-danger" class="" type="reset">Сбросить</b-button>
      </b-form>
    </template>
  </EntityIndexPageLayout>
</template>

<script lang="ts">
import {Component, Inject, Mixins} from "vue-property-decorator";
import Realty from "@/models/Realty";
import TableStateController from "@/mixins/tableStateController";
import {AxiosResponse} from "axios";
import {realtyMinMaxInfo, responseWithPaginator} from "@/common/types";
import SearchHelpers from "@/mixins/searchHelpers";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import Equipment from "@/models/Equipment";
import RealtyType from "@/models/RealtyType";
import ItemsCountInfo from "@/components/ItemsCountInfo.vue";
import SearchPanel from "@/components/SearchPanel.vue";
import ModalDeletingConfirm from "@/components/ModalDeletingConfirm.vue";
import EntityIndexPageLayout from "@/components/EntityIndexPageLayout.vue";


@Component({
  components: {EntityIndexPageLayout, ModalDeletingConfirm, SearchPanel, ItemsCountInfo}
})
export default class Home extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
  showConfirmModal = false
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
      key: 'name',
      label: 'Описание',
      searchable: true,
      sortable: true,
    },
    {
      key: 'realtyTypeName',
      label: 'Тип'
    },
    {
      key: 'area',
      label: 'Площадь',
      sortable: true,
      searchable: true
    },
    {
      key: 'price',
      label: 'Стоимость (руб.)',
      sortable: true,
      searchable: true
    },
    {
      key: 'discount_sum',
      label: 'Скидка (руб.)',
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
      key: 'is_published',
      label: 'Статус',
      sortable: true,
    },
    {
      key: 'updated_at',
      label: 'Изменен',
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'Создан',
      sortable: true,
    },
  ]
  items = [] as Array<Realty>
  tableOptionsRealty = {
    equipments: [] as Array<number>,
    types: [] as Array<number>,
    areaMin: null as number | null,
    priceMin: null as number | null,
    pricePerMetrMin: null as number | null,
  }
  realtyMinMax = {} as realtyMinMaxInfo
  equipments = [] as Array<Equipment>
  types = [] as Array<RealtyType>
  @Inject('basePath') basePath!: string

  onDelete (): void {
    Realty.destroy(this.selected.map(value => value.id as number)).then(() => {
      getModule(Notification, this.$store).setData({title: 'Удаление прошло успешно', variant: 'success'})
      this.updateTableData();
    })
  }

  updateTableData(): Promise<AxiosResponse<responseWithPaginator<Realty>>> {
    if (this.$table) {
      this.$table.clearSelected()
      this.selectedAllRows = false
    }

    return Realty.getList(this.tableOptionsCleared)
        .then(response => {
          this.items = response.data.data

          return response
        })
  }

  onSearch (): void {
    this.tableOptions = { ...this.tableOptions, ...this.tableOptionsRealty, page: 1, searchField: this.tableTemp.searchField, searchValue: this.tableTemp.searchValue }
  }

  onReset (): void {
    this.tableOptionsRealty.priceMin = this.realtyMinMax.priceMin
    this.tableOptionsRealty.areaMin = this.realtyMinMax.areaMin
    this.tableOptionsRealty.pricePerMetrMin = this.realtyMinMax.pricePerMetrMin
    this.tableOptionsRealty.equipments = []
    this.tableOptionsRealty.types = []
    this.tableTemp.searchValue = ''

    this.onSearch()
  }

  created(): void {
    Equipment.getList().then(response => {
      this.equipments = response.data
    })
    RealtyType.getList().then(response => {
      this.types = response.data
    })
    Realty.getMinMax().then(response => {
      this.realtyMinMax = response.data
      this.tableOptionsRealty.priceMin = this.realtyMinMax.priceMin
      this.tableOptionsRealty.areaMin = this.realtyMinMax.areaMin
      this.tableOptionsRealty.pricePerMetrMin = this.realtyMinMax.pricePerMetrMin
    })
  }

  mounted(): void {
    this.$table = this.$refLayout.$table
  }
}
</script>

<style scoped lang="stylus">

</style>
