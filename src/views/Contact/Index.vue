<template>
  <div class="section">
    <h1 class="mb-5">Категория недвижимости</h1>
    <ModalDeletingConfirm :show="showConfirmModal" @close="showConfirmModal = false" :confirm-handler="onConfirm" @cancel="showConfirmModal = false"/>
    <b-card class="mb-4 shadow-sm">
      <div class="d-flex">
        <b-button variant="primary" class="mr-2" :to="{ name: 'admin.contact.create' }">Создать</b-button>
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
import Slide from "@/models/Slide";
import Contact from "@/models/Contact";
import ItemsCountInfo from "@/components/ItemsCountInfo.vue";
import ModalDeletingConfirm from "@/components/ModalDeletingConfirm.vue";


@Component({
  components: {ModalDeletingConfirm, ItemsCountInfo}
})
export default class Index extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
  showConfirmModal = false
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

  get selectionBtnText (): string { return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все' }

  onConfirm(): void {
    Contact.destroy(this.selected.map(value => value.id as number)).then(() => {
      getModule(Notification, this.$store).setData({ title: 'Удаление прошло успешно', variant: 'success' })
      this.updateTableData();
    })
  }

  onDelete (): void {
    this.showConfirmModal = true
  }

  updateTableData(): Promise<AxiosResponse<Array<Slide>>> {
    return Contact.getList(this.tableOptionsCleared)
        .then(response => {
          this.items = response.data

          return response
        })
  }
}
</script>

<style scoped>

</style>
