import {AxiosResponse} from "axios";
import api from "../common/myApi.json";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

class Slide extends BaseModel{
    image?: string;
    header?: string;
    content?: string;
    id?: number;

    static getList(options: { [key: string]: any } = { page: 1 }): Promise<AxiosResponse<Array<Slide>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Array<Slide>>('slide', { params: options })
        } else {
            return new Promise<AxiosResponse<Array<Slide>>>((resolve) => {
                resolve({ data: api.Slide }as AxiosResponse<Array<Slide>>)
            })
        }

    }

    static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<Slide>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Slide>('slide/' + params.id, { params: params })
        } else {
            return new Promise<AxiosResponse<Slide>>((resolve) => {
                resolve({ data: api.Slide[0] } as AxiosResponse<Slide>)
            })
        }
    }

    static create (params: { [key: string]: any }): Promise<AxiosResponse<Slide>> {
        return http.post<Slide>('slide', Slide.prepareFormData(params))
    }
    static update (params: { [key: string]: any }): Promise<AxiosResponse<Slide>> {
        return http.post<Slide>('slide/' + params.id, Slide.prepareFormData({...params, "_method": "PUT"}))
    }
    static destroy (data: { [key: string]: any }): Promise<AxiosResponse> {
        return http.delete('slide', { params: { id: data } })
    }

}

export default Slide
