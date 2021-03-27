import {Component, Mixins, Watch} from "vue-property-decorator";
import {AxiosResponse} from "axios";
import {responseWithPaginator} from "@/common/types";


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

    get tableOptionsCleared (): { [key: string]: any } {
        return Object.keys(this.tableOptions).reduce((acc, value) => {
            // @ts-ignore
            if (this.tableOptions[value]) {
                // @ts-ignore
                acc[value] = this.tableOptions[value]
            }

            return acc
        }, {} as { [key: string]: any })
    }

    updateTableData(): Promise<AxiosResponse<responseWithPaginator>> | null {
        return null
    }
    onChangeSort (sortOptions: { sortBy: string, sortDesc: boolean }): void {
        this.tableOptions = { ...this.tableOptions, sortBy: sortOptions.sortBy, sortType: sortOptions.sortDesc ? 'desc' : 'asc' }
    }
    omSearch (): void {
        this.tableOptions = {...this.tableOptions, page: 1, sortBy: null, sortType: null, searchField: this.tableTemp.searchField, searchValue: this.tableTemp.searchValue }
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
            response
                .then(response => {
                    const meta = response.data.meta

                    this.tableInfo = {totalItems: meta.total, totalPages: meta.last_page}
                })
                .finally(() => {
                    this.inRequestState = false
                })
        }
    }
}
