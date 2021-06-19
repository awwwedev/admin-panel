import {AxiosResponse} from "axios";
import api from "../common/myApi.json";
import http from "@/common/http";
import {responseWithPaginator} from "@/common/types";
import BaseModel from "@/models/BaseModel";

class Requests extends BaseModel {
  email?: string;
  message?: string;
  phone?: string;
  new?: number;
  realtie_id?: number;
  id?: number;

  static getList(options: { [key: string]: any } = { page: 1 }): Promise<AxiosResponse<responseWithPaginator<Requests>>> {
    if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
      return http.get<responseWithPaginator<Requests>>('request', { params: options })
    } else {
      return new Promise<AxiosResponse<responseWithPaginator<Requests>>>((resolve) => {
        resolve({ data: { data: api.news } }as AxiosResponse<responseWithPaginator<Requests>>)
      })
    }
  }

  static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<Requests>> {
    if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
      return http.get<Requests>('request/' + params.id, { params: params })
    } else {
      return new Promise<AxiosResponse<Requests>>((resolve) => {
        resolve({ data: api.news[0] } as AxiosResponse<Requests>)
      })
    }
  }
  static update (params: { [key: string]: any }): Promise<AxiosResponse<Requests>> {
    return http.post<Requests>('request/' + params.id, Requests.prepareFormData({...params, "_method": "PUT"}))
  }
  static destroy (data: { [key: string]: any }): Promise<AxiosResponse> {
    return http.delete('request', { params: { id: data } })
  }

}

export default Requests
