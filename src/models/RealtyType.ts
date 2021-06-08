import {AxiosResponse} from "axios";
import api from "@/common/myApi.json";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

export default class RealtyType extends BaseModel {
    name?: string
    img_path?: string

    static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<RealtyType>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<RealtyType>('realtyType/' + params.id, { params: params })
        } else {
            return new Promise<AxiosResponse<RealtyType>>((resolve) => {
                resolve({ data: api.realtyType[0] } as AxiosResponse<RealtyType>)
            })
        }
    }

    static getList(params: { [key: string]: number | string } = {}): Promise<AxiosResponse<RealtyType[]>> {

        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<RealtyType[]>('realtyType', { params: params })
        } else {
            return new Promise<AxiosResponse<RealtyType[]>>((resolve) => {
                resolve({ data: api.realtyType } as AxiosResponse<RealtyType[]>)
            })
        }
    }

    static create (params: { [key: string]: any }): Promise<AxiosResponse<RealtyType>> {
        return http.post<RealtyType>('realtyType', RealtyType.prepareFormData(params))
    }
    static update (params: { [key: string]: any }): Promise<AxiosResponse<RealtyType>> {
        return http.post<RealtyType>('realtyType/' + params.id, RealtyType.prepareFormData({...params, "_method": "PUT"}))
    }
    static destroy (data: { [key: string]: any }): Promise<AxiosResponse> {
        return http.delete('realtyType', { params: { id: data } })
    }
}
