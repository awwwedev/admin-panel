<template>
    <div class="section">
        <h1 class="mb-5">{{ pageTitle }}</h1>
        <ModalDeletingConfirm :show="showConfirmModal" @close="showConfirmModal = false" @confirm="onDelete" @cancel="showConfirmModal = false"/>
        <b-card class="mb-4 shadow-sm">
            <div class="d-flex flex-column flex-md-row">
                <b-button v-if="!disableCreationBtn" variant="primary" class="mr-md-2 mr-sm-0 my-1" :to="{ name: routeNameCreate }">Создать</b-button>
                <b-button v-if="!disableMultipleDeletionBtn" variant="info" class="mr-md-3 mr-sm-0 my-1" @click="onSelectAll">{{ selectionBtnText }}</b-button>
                <b-button v-if="!disableMultipleDeletionBtn" variant="danger" class=" my-1" :disabled="!selected.length" @click="onOpenConfirm">Удалить выбранное</b-button>
            </div>
        </b-card>
        <b-card class="shadow-sm table-container">
            <slot name="filters">
                <SearchPanel :columns="columns" @changedField="tableTemp.searchField = $event" v-model="tableTemp.searchValue" @search="onSearch"/>
            </slot>
            <div class="table">
                <b-table
                  :fields="columns"
                  :items="items"
                  responsive="true"
                  select-mode="multi"
                  striped
                  hover
                  :selectable="!disableMultipleDeletionBtn"
                  @row-selected="onRowSelected"
                  @sort-changed="onChangeSort"
                  sort-icon-left
                  ref="table"
                  :busy="inRequestState"
                >
                    <template v-for="column in columns" v-slot:[getSlotName(column.key)]="{ item }">
                        <slot :name="`cell(${column.key})`" :item="item"/>
                    </template>
                </b-table>
            </div>

                <ItemsCountInfo v-if="tableInfo.totalItems" :info="itemsCountInfo" :total="tableInfo.totalItems"/>
                <ItemsCountInfo v-else :total="items.length"/>
            <div v-if="withPaginate" class="d-flex justify-content-between align-items-center">
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
    import {Component, Emit, Vue, Prop, Ref} from 'vue-property-decorator';
  import ModalDeletingConfirm from "@/components/ModalDeletingConfirm.vue";
  import ItemsCountInfo from "@/components/ItemsCountInfo.vue";
  import SearchPanel from "@/components/SearchPanel.vue";
  import {itemCountInfo, objectWIthAnyProperties, tableColumn, tableItem} from "@/common/types";
  import {BTable} from "bootstrap-vue";


  @Component({
    components: {SearchPanel, ItemsCountInfo, ModalDeletingConfirm}
  })
  export default class EntityIndexPageLayout extends Vue {
    @Ref('table') $table!: BTable
    @Prop({ type: Boolean, default: false }) withPaginate!: boolean
    @Prop({ required: true, type: String }) pageTitle!: string
    @Prop({ required: true, type: String }) routeNameChange!: string
    @Prop({ required: true, type: String }) routeNameCreate!: string
    @Prop({ required: true, type: Boolean }) selectedAllRows!: boolean
    @Prop({ type: Boolean, default: false }) disableCreationBtn!: boolean
    @Prop({ type: Boolean, default: false }) disableMultipleDeletionBtn!: boolean
    @Prop({ required: true, type: Boolean }) inRequestState!: boolean
    @Prop({ required: true, type: Object }) itemsCountInfo!: itemCountInfo
    @Prop({ required: true, type: Object }) tableTemp!: Array<objectWIthAnyProperties>
    @Prop({ required: true, type: Object }) tableInfo!: { totalItems: number, totalPages: number }
    @Prop({ required: true, type: Object }) tableOptions!: objectWIthAnyProperties
    @Prop({ required: true, type: Array }) columns!: Array<tableColumn>
    @Prop({ required: true, type: Array }) items!: Array<tableItem>
    @Prop({ required: true, type: Array }) selected!: Array<objectWIthAnyProperties>
    get selectionBtnText (): string { return this.selectedAllRows ? 'Снять выделение' : 'Выбрать все' }
    showConfirmModal = false

    getSlotName (key: string): string {
      return `cell(${key})` + (this.$scopedSlots[`cell(${key})`] ? '' : '1')
    }

      onOpenConfirm (): void {
          this.showConfirmModal = true
      }

    @Emit('deleteItem') onDelete(item: tableItem): tableItem {
        this.showConfirmModal = false
        return item
    }
    @Emit('selectAll') onSelectAll(): void { return }
    @Emit('rowSelected') onRowSelected(item: tableItem): tableItem { return item }
    @Emit('search') onSearch(): void { return }
    @Emit('changeSort') onChangeSort(sorting: { sortBy: string, sortDesc: boolean }): { sortBy: string, sortDesc: boolean } { return sorting }
  }
</script>

<style scoped lang="stylus">
    .table-container
        max-width 100%

    ::v-deep .table

        & .table-responsive-true
            overflow-x auto !important
</style>