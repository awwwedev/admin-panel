import BaseModel from "@/models/BaseModel";
import {AxiosResponse} from "axios";
import http from "@/common/http";
import api from "@/common/myApi.json";

export default class TicketMessage extends BaseModel {
    message!: string
    author!: string
    ticket_id!: number

    static getList(params: { ticket_user_id: number, [key: string]: any }): Promise<AxiosResponse<Array<TicketMessage>>> {
        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Array<TicketMessage>>(`auth/ticket-message`, { params })
        } else {
            return new Promise<AxiosResponse<Array<TicketMessage>>>((resolve) => {
                resolve({ data: api.User }as AxiosResponse<Array<TicketMessage>>)
            })
        }

    }

    static create (params: { ticket_user_id: number, message: string, [key: string]: any }): Promise<AxiosResponse<TicketMessage>> {
        return http.post<TicketMessage>('auth/ticket-message', TicketMessage.prepareFormData(params))
    }
}