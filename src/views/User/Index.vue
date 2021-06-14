<template>
  <EntityIndexPageLayout :columns="columns"
                         :items="items"
                         page-title="Пользователь"
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
    <template #cell(email)="{ item }">
      <b-link :to="{ name: 'admin.user.change', params: { id: item.id } }" v-html="item.email "></b-link>
    </template>
    <template #cell(actions)="{ item }">
      <b-button variant="info" :to="{ name: 'admin.user.chat', params: { id: item.id } }">Сообщеия</b-button>
      <b-button variant="danger" @click="onDeleteSingle(item)">Удалить</b-button>
    </template>
    <template #cell(hasNewMessage)="{ item }">
      {{ item.hasNewMessage ? 'Да' : 'Нет' }}
    </template>

  </EntityIndexPageLayout>
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
import EntityIndexPageLayout from "@/components/EntityIndexPageLayout.vue";


@Component({
  components: {EntityIndexPageLayout, ModalDeletingConfirm, ItemsCountInfo}
})
export default class Index extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
  @Inject('basePath') basePath!: string
  columns = [
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
      key: 'hasNewMessage',
      label: 'Новые сообщения'
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

  onDelete (): void {
    console.log(this.userToDelete)
    User.destroySingle(this.userToDelete?.id as number).then(() => {
      getModule(Notification, this.$store).setData({ title: 'Удаление прошло успешно', variant: 'success' })
      this.updateTableData();
    }).finally(() => {
      this.userToDelete = null
    })
  }

  onDeleteSingle (user: User): void {
    this.userToDelete = user
    this.$refLayout.onOpenConfirm()
  }

  updateTableData(): Promise<AxiosResponse<Array<User>>> {
    return User.getList({
      ...this.tableOptionsCleared,
      withHasNewMessage: true
    })
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
