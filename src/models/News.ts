import {AxiosResponse} from "axios";
import api from "../common/myApi.json";
import http from "@/common/http";
import {responseWithPaginator} from "@/common/types";
import BaseModel from "@/models/BaseModel";

class News extends BaseModel {
    photo?: string;
    header?: string;
    content?: string;
    id?: number;

    static getList(options: { [key: string]: any } = { page: 1 }): Promise<AxiosResponse<responseWithPaginator<News>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<responseWithPaginator<News>>('news', { params: options })
        } else {
            return new Promise<AxiosResponse<responseWithPaginator<News>>>((resolve) => {
                resolve({ data: { data: api.news } }as AxiosResponse<responseWithPaginator<News>>)
            })
        }

    }

    static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<News>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<News>('news/' + params.id, { params: params })
        } else {
            return new Promise<AxiosResponse<News>>((resolve) => {
                resolve({ data: api.news[0] } as AxiosResponse<News>)
            })
        }
    }

    static create (params: { [key: string]: any }): Promise<AxiosResponse<News>> {
        return http.post<News>('news', News.prepareFormData(params))
    }
    static update (params: { [key: string]: any }): Promise<AxiosResponse<News>> {
        return http.post<News>('news/' + params.id, News.prepareFormData({...params, "_method": "PUT"}))
    }
    static destroy (data: { [key: string]: any }): Promise<AxiosResponse> {
        return http.delete('news', { params: { id: data } })
    }

}

export default News
