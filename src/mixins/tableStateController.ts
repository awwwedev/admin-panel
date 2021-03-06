import {Component, Mixins, Ref, Watch} from "vue-property-decorator";
import {AxiosResponse} from "axios";
import {itemCountInfo, responseWithPaginator, tableItem} from "@/common/types";
import {BTable} from "bootstrap-vue";
import BaseModel from "@/models/BaseModel";
import EntityIndexPageLayout from "@/components/EntityIndexPageLayout.vue";


@Component({})
export default class TableStateController extends Mixins() {
    inRequestState = false
    tableOptions = {
        page: 1 as number,
        perPage: 10 as number,
        sortBy: null as string | null,
        sortType: null as string | null,
        filter: [] as Array<{ field: string, value: string | number }>,
        searchField: null as string | null,
        searchValue: null as string | number | null
    }
    tableInfo = {
        totalItems: 0,
        totalPages: 0
    }
    tableTemp = {
        perPage: 10 as string | number,
        searchField: null as string | null,
        searchValue: null as string | number | null
    }
    selected: Array<tableItem> = []
    selectedAllRows = false
    items: Array<BaseModel> = []
    $table!: BTable
    @Ref('EntityIndexPageLayout') $refLayout!: EntityIndexPageLayout


    get tableOptionsCleared (): { [key: string]: any } {
        return Object.keys(this.tableOptions).reduce((acc, value) => {
            // @ts-ignore
            const data = this.tableOptions[value]

            if (data || (data instanceof Array && data.length)) {
                // @ts-ignore
                acc[value] = this.tableOptions[value]
            }

            return acc
        }, {} as { [key: string]: any })
    }

    get itemsCountInfo (): itemCountInfo {
        const countItemByPage = this.tableOptions.perPage * (this.tableOptions.page - 1)

        return {
            leftBound: countItemByPage + 1,
            rightBound: countItemByPage + this.items.length
        }
    }

    updateTableData(): Promise<AxiosResponse<responseWithPaginator>> | null | Promise<AxiosResponse<Array<BaseModel>>> {
        return null
    }
    onChangeSort (sortOptions: { sortBy: string, sortDesc: boolean }): void {
        this.tableOptions = { ...this.tableOptions, sortBy: sortOptions.sortBy, sortType: sortOptions.sortDesc ? 'desc' : 'asc', page: 1 }
    }
    onSearch (): void {
        this.tableOptions = {...this.tableOptions, page: 1, sortBy: null, sortType: null, searchField: this.tableTemp.searchField, searchValue: this.tableTemp.searchValue }
    }
    onRowSelected(items: Array<tableItem>): void {
        this.selected = items
    }
    onSelectAll(): void {
        if (this.selectedAllRows) {
            this.$table.clearSelected()
            this.selectedAllRows = false
        } else {
            this.$table.selectAllRows()
            this.selectedAllRows = true
        }
    }

    @Watch('tableTemp.perPage')
    watchTableTempPerPage(): void {
        if (this.tableTemp.perPage === 'all') {
            this.tableOptions.perPage = this.tableInfo.totalItems
        } else {
            this.tableOptions.perPage = this.tableTemp.perPage as number
        }
    }
    @Watch('tableOptions', {deep: true, immediate: true})
    watchTableOptions(): void {
        this.inRequestState = true

        const response = this.updateTableData()

        if (response) {

            // @ts-ignore
            response.then((response) => {
                    if (!(response.data instanceof Array)) {
                        const meta = (response as AxiosResponse<responseWithPaginator>).data.meta

                        this.tableInfo = {totalItems: meta.total, totalPages: meta.last_page}
                    }
                })
                .finally(() => {
                    this.inRequestState = false
                })
        }
    }
}
