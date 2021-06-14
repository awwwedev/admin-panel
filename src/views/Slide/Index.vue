<template>
  <EntityIndexPageLayout :columns="columns"
                         :items="items"
                         page-title="Слайды"
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
    <template #cell(image)="{ item }">
      <b-img fluid width="150" :src="basePath + item.image"/>
    </template>
    <template #cell(header)="{ item }">
      <b-link :to="{ name: 'admin.slide.change', params: { id: item.id } }"
              v-html="tableOptions.searchValue ? getValueWithSearchPart(item.header, tableOptions.searchValue) : item.header "></b-link>
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
  import Slide from "@/models/Slide";
  import ItemsCountInfo from "@/components/ItemsCountInfo.vue";
  import ModalDeletingConfirm from "@/components/ModalDeletingConfirm.vue";
  import EntityIndexPageLayout from "@/components/EntityIndexPageLayout.vue";


  @Component({
    components: {EntityIndexPageLayout, ModalDeletingConfirm, ItemsCountInfo}
  })
  export default class Index extends Mixins<TableStateController, SearchHelpers>(TableStateController, SearchHelpers) {
    @Inject('basePath') basePath!: string
    columns = [
      {
        key: 'selected',
        label: ''
      },
      {
        key: 'image',
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
    items = [] as Array<Slide>

    onDelete(): void {
      Slide.destroy(this.selected.map(value => value.id as number)).then(() => {
        getModule(Notification, this.$store).setData({title: 'Удаление прошло успешно', variant: 'success'})
        this.updateTableData();
      })
    }

    updateTableData(): Promise<AxiosResponse<Array<Slide>>> {
      return Slide.getList(this.tableOptionsCleared)
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
