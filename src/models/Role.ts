import BaseModel from "@/models/BaseModel";
import {AxiosResponse} from "axios";
import http from "@/common/http";
import api from "@/common/myApi.json";

export class Role extends BaseModel {
    id?: number
    role?: string

    static getList(): Promise<AxiosResponse<Array<Role>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Array<Role>>('role', { })
        } else {
            return new Promise<AxiosResponse<Array<Role>>>((resolve) => {
                resolve({ data: api.User }as AxiosResponse<Array<Role>>)
            })
        }

    }
}