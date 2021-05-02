<template>
  <div class="section">
    <h1 class="mb-5">Недвижимость</h1>
    <b-card class="mb-4 shadow-sm">
      <div class="d-flex">
        <b-button variant="primary" class="mr-2" :to="{ name: 'admin.realty.create' }">Создать</b-button>
        <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
        <b-button variant="danger" class="my-2 my-sm-0" :disabled="!selected.length" @click="onDelete">Удалить
          выбранное
        </b-button>
      </div>
    </b-card>
    <b-card class="shadow-sm">
      <b-form class="mb-3" @submit.prevent="onSearch" @reset.prevent="onReset">
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
          <b-link :to="{ name: 'admin.realty.change', params: { id: item.id } }"
                  v-html="tableOptions.searchValue ? getValueWithSearchPart(item.name, tableOptions.searchValue) : item.name "></b-link>
        </template>
      </b-table>
      <div class="text-secondary mb-3">
        {{ (tableOptions.perPage * tableOptions.page) }} / {{ tableInfo.totalItems }}
      </div>
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
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import Realty from "@/models/Realty";
import TableStateController from "@/mixins/tableStateController";
import {AxiosResponse} from "axios";
import {realtyMinMaxInfo, responseWithPaginator} from "@/common/types";
import SearchHelpers from "@/mixins/searchHelpers";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import Equipment from "@/models/Equipment";
import RealtyType from "@/models/RealtyType";


@Component({})
export default class Home extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
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
  basePath = process.env.VUE_APP_URL

  get selectionBtnText(): string {
    return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все'
  }

  onDelete(): void {
    Realty.destroy(this.selected.map(value => value.id as number)).then(() => {
      getModule(Notification, this.$store).setData({title: 'Удаление прошло успешно', variant: 'success'})
      this.updateTableData();
    })
  }

  updateTableData(): Promise<AxiosResponse<responseWithPaginator<Realty>>> {
    return Realty.getList(this.tableOptionsCleared)
        .then(response => {
          this.items = response.data.data

          return response
        })
  }

  onSearch (): void {
    this.tableOptions = { ...this.tableOptions, ...this.tableOptionsRealty, page: 1 }
  }

  onReset (): void {
    this.tableOptionsRealty.priceMin = this.realtyMinMax.priceMin
    this.tableOptionsRealty.areaMin = this.realtyMinMax.areaMin
    this.tableOptionsRealty.pricePerMetrMin = this.realtyMinMax.pricePerMetrMin
    this.tableOptionsRealty.equipments = []
    this.tableOptionsRealty.types = []

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
}
</script>

<style scoped lang="stylus">

</style>
