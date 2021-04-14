import {AxiosResponse} from "axios";
import api from "@/common/myApi.json";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";
import {realtyMinMaxInfo, responseWithPaginator} from "@/common/types";
import Equipment from "@/models/Equipment";

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
    equipments?: Array<Equipment>

    static getMinMax() : Promise<AxiosResponse<realtyMinMaxInfo>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<realtyMinMaxInfo>('realty/minMax')
        } else {
            return new Promise<AxiosResponse<realtyMinMaxInfo>>((resolve) => {
                resolve({ data: api.realtyMinMax } as AxiosResponse<realtyMinMaxInfo>)
            })
        }
    }

    static getList(params: { [key: string]: any } = {}): Promise<AxiosResponse<responseWithPaginator<Realty>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<responseWithPaginator<Realty>>('realty', { params: params })
        } else {
            return new Promise<AxiosResponse<responseWithPaginator<Realty>>>((resolve) => {
                resolve({ data: { data: api.realty } } as AxiosResponse<responseWithPaginator<Realty>>)
            })
        }
    }
    static getListMap(params: { [key: string]: number | string | undefined | Array<number> } = {}): Promise<AxiosResponse<Array<Realty>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Array<Realty>>('realty/map', { params: params })
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

    static create (params: { [key: string]: any }): Promise<AxiosResponse<Realty>> {
        return http.post<Realty>('realty', Realty.prepareFormData(params))
    }
    static update (params: { [key: string]: any }): Promise<AxiosResponse<Realty>> {
        return http.post<Realty>('realty/' + params.id, Realty.prepareFormData({...params, "_method": "PUT"}))
    }
    static destroy (data: { [key: string]: any }): Promise<AxiosResponse> {
        return http.delete('realty', { params: { id: data } })
    }
}
