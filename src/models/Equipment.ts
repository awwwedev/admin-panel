import {AxiosResponse} from "axios";
import api from "../common/myApi.json";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

class Equipment extends BaseModel {
    id?: number;
    name?: string;
    realty_type_id?: number;

    static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<Equipment>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Equipment>('equipment/' + params.id, { params: params })
        } else {
            return new Promise<AxiosResponse<Equipment>>((resolve) => {
                resolve({ data: api.realtyType[0] } as AxiosResponse<Equipment>)
            })
        }
    }

    static getList(params: { [key: string]: number | string | undefined } = {}): Promise<AxiosResponse<Array<Equipment>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Array<Equipment>>('equipment', { params })
        } else {
            return new Promise<AxiosResponse<Array<Equipment>>>((resolve) => {
                resolve({ data: api.equipments }as AxiosResponse<Array<Equipment>>)
            })
        }

    }

    static create (params: { [key: string]: any }): Promise<AxiosResponse<Equipment>> {
        return http.post<Equipment>('equipment', Equipment.prepareFormData(params))
    }
    static update (params: { [key: string]: any }): Promise<AxiosResponse<Equipment>> {
        return http.post<Equipment>('equipment/' + params.id, Equipment.prepareFormData({...params, "_method": "PUT"}))
    }
    static destroy (data: { [key: string]: any }): Promise<AxiosResponse> {
        return http.delete('equipment', { params: { id: data } })
    }
}

export default Equipment
