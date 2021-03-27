import {AxiosResponse} from "axios";
import api from "@/common/myApi.json";
import http from "@/common/http";
import Paginator from "@/common/helpers/Paginator";
import BaseModel from "@/models/BaseModel";
import {realtyMinMaxInfo} from "@/common/types";

export default class Realty extends BaseModel {
    id?: number
    img_path?: string
    name?: string
    description?: string
    realtyTypeName?: string
    price?: number
    area?: number
    latitude?: number
    longitude?: number
    price_per_metr?: number
    type_id?: number
    photo?: Array<string>

    access?: number
    energy?: number
    furniture?: number
    renovation?: number
    restroom?: number
    heating?: number

    static getMinMax() : Promise<AxiosResponse<realtyMinMaxInfo>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<realtyMinMaxInfo>('realties/minmax')
        } else {
            return new Promise<AxiosResponse<realtyMinMaxInfo>>((resolve) => {
                resolve({ data: api.realtyMinMax } as AxiosResponse<realtyMinMaxInfo>)
            })
        }
    }

    static getList(params: { [key: string]: number | string | undefined } = {}): Promise<AxiosResponse<Paginator<Realty>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Paginator<Realty>>('realties', { params: params })
        } else {
            return new Promise<AxiosResponse<Paginator<Realty>>>((resolve) => {
                resolve({ data: { data: api.realty } } as AxiosResponse<Paginator<Realty>>)
            })
        }
    }
    static getListMap(params: { [key: string]: number | string | undefined | Array<number> } = {}): Promise<AxiosResponse<Array<Realty>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Array<Realty>>('realties/map', { params: params })
        } else {
            return new Promise<AxiosResponse<Array<Realty>>>((resolve) => {
                resolve({ data: api.realty } as AxiosResponse<Array<Realty>>)
            })
        }
    }

    static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<Realty>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Realty>('realty/' + params.id, { params: params })
        } else {
            return new Promise<AxiosResponse<Realty>>((resolve) => {
                resolve({ data: api.realty[0] } as AxiosResponse<Realty>)
            })
        }
    }
}
