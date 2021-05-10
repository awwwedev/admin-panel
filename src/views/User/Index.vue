<template>
  <div class="section">
    <h1 class="mb-5">Слайды</h1>
    <ModalDeletingConfirm :show="showConfirmModal" @close="onClose" :confirm-handler="onConfirm" @cancel="onClose"/>
    <b-card class="mb-4 shadow-sm">
      <div class="d-flex">
        <b-button variant="primary" class="mr-2" :to="{ name: 'admin.user.create' }">Создать</b-button>
        <b-button variant="info" class="mr-3" @click="onSelectAll">{{ selectionBtnText }}</b-button>
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
          @sort-changed="onChangeSort"
          ref="table"
          :busy="inRequestState"
      >
        <template #cell(email)="{ item }">
          <b-link :to="{ name: 'admin.user.change', params: { id: item.id } }" v-html="item.email "></b-link>
        </template>
        <template #cell(actions)="{ item }">
          <b-button variant="danger" @click="onDeleteSingle(item)">Удалить</b-button>
        </template>
      </b-table>
      <ItemsCountInfo :total="items.length"/>
    </b-card>
  </div>
</template>

<script lang="ts">
import {Component, Inject, Mixins} from "vue-property-decorator";
import TableStateController from "@/mixins/tableStateController";
import SearchHelpers from "@/mixins/searchHelpers";
import {AxiosResponse} from "axios";
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import ItemsCountInfo from "@/components/ItemsCountInfo.vue";
import ModalDeletingConfirm from "@/components/ModalDeletingConfirm.vue";
import User from "@/models/User";


@Component({
  components: {ModalDeletingConfirm, ItemsCountInfo}
})
export default class Index extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
  @Inject('basePath') basePath!: string
  showConfirmModal = false
  fields = [
    {
      key: 'name',
      label: 'ФИО',
      sortable: true,
      searchable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      searchable: true
    },
    {
      key: 'phone',
      label: 'Номер телефона',
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
    },
    {
      key: 'actions',
      label: ''
    },
  ]
  items = [] as Array<User>
  userToDelete = null as null | User

  get selectionBtnText (): string { return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все' }

  onConfirm (): void {
    User.destroySingle(this.userToDelete?.id as number).then(() => {
      getModule(Notification, this.$store).setData({ title: 'Удаление прошло успешно', variant: 'success' })
      this.updateTableData();
    }).finally(() => {
      this.userToDelete = null
    })
  }

  onClose (): void {
    this.showConfirmModal = false
    this.userToDelete = null
  }

  onDeleteSingle (user: User): void {
    this.userToDelete = user
    this.showConfirmModal = true
  }

  updateTableData(): Promise<AxiosResponse<Array<User>>> {
    return User.getList(this.tableOptionsCleared)
        .then(response => {
          this.items = response.data

          return response
        })
  }
}
</script>

<style scoped>

</style>
