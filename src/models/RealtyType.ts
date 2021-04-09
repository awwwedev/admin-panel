import {AxiosResponse} from "axios";
import api from "@/common/myApi.json";
import http from "@/common/http";

export default class RealtyType {
    constructor(data: {id?: number | string, name?: string}) {
        this.id = data.id
        this.name = data.name
    }

    id?: number | string
    name?: string

    static getList(params: { [key: string]: number | string } = {}): Promise<AxiosResponse<RealtyType[]>> {

        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<RealtyType[]>('realtyType', { params: params })
        } else {
            return new Promise<AxiosResponse<RealtyType[]>>((resolve) => {
                resolve({ data: api.realtyType } as AxiosResponse<RealtyType[]>)
            })
        }
    }
}
