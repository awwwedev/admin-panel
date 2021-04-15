import {AxiosResponse} from "axios";
import api from "../common/myApi.json";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

class Contact extends BaseModel{
    image?: string;
    header?: string;
    type?: string;
    value?: string;
    is_rent_department?: number;
    id?: number;

    static getList(options: { [key: string]: any } = { page: 1 }): Promise<AxiosResponse<Array<Contact>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Array<Contact>>('contact', { params: options })
        } else {
            return new Promise<AxiosResponse<Array<Contact>>>((resolve) => {
                resolve({ data: api.Contact }as AxiosResponse<Array<Contact>>)
            })
        }

    }

    static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<Contact>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Contact>('contact/' + params.id, { params: params })
        } else {
            return new Promise<AxiosResponse<Contact>>((resolve) => {
                resolve({ data: api.Contact[0] } as AxiosResponse<Contact>)
            })
        }
    }

    static create (params: { [key: string]: any }): Promise<AxiosResponse<Contact>> {
        return http.post<Contact>('contact', Contact.prepareFormData(params, true))
    }
    static update (params: { [key: string]: any }): Promise<AxiosResponse<Contact>> {
        return http.post<Contact>('contact/' + params.id, Contact.prepareFormData({...params, "_method": "PUT"}, true))
    }
    static destroy (data: { [key: string]: any }): Promise<AxiosResponse> {
        return http.delete('contact', { params: { id: data } })
    }

}

export default Contact
