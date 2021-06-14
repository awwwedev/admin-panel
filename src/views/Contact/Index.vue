<template>
  <EntityIndexPageLayout :columns="columns"
                         :items="items"
                         page-title="Категория недвижимости"
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
    <template #cell(value)="{ item }">
      <b-link :to="{ name: 'admin.contact.change', params: { id: item.id } }" v-html="item.value"/>
    </template>
    <template #cell(is_rent_department)="{ item }">
      {{ item.is_rent_department ? 'Да' : 'Нет' }}
    </template>
    <template #cell(type)="{ item }">
      {{ item.type ==='email' ? 'Почта' : 'Телефон' }}
    </template>
    <template #cell(header)="{ item }">
      {{ item.header }}
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
import Slide from "@/models/Slide";
import Contact from "@/models/Contact";
import ItemsCountInfo from "@/components/ItemsCountInfo.vue";
import ModalDeletingConfirm from "@/components/ModalDeletingConfirm.vue";
import EntityIndexPageLayout from "@/components/EntityIndexPageLayout.vue";


@Component({
  components: {EntityIndexPageLayout, ModalDeletingConfirm, ItemsCountInfo}
})
export default class Index extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
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
      key: 'header',
      label: 'Название',
      searchable: true,
      sortable: true,
    },
    {
      key: 'type',
      label: 'Тип',
      searchable: true,
      sortable: true,
    },
    {
      key: 'is_rent_department',
      label: 'Контакт филиала',
      searchable: true,
      sortable: true,
    },
    {
      key: 'value',
      label: 'Значение',
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
  items = [] as Array<Contact>

  onDelete(): void {
    Contact.destroy(this.selected.map(value => value.id as number)).then(() => {
      getModule(Notification, this.$store).setData({ title: 'Удаление прошло успешно', variant: 'success' })
      this.updateTableData();
    })
  }

  updateTableData(): Promise<AxiosResponse<Array<Slide>>> {
    return Contact.getList(this.tableOptionsCleared)
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
