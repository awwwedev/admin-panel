import BaseModel from "@/models/BaseModel";
import {AxiosResponse} from "axios";
import http from "@/common/http";


export default class Ticket extends BaseModel {
  message!: string
  author!: string
  status!: number

  static STATE_NEW = 0
  static STATE_OPEN = 1
  static STATE_WAITING = 2
  static STATE_CLOSED = 3

  static get(params: { [key: string]: string | number }): Promise<AxiosResponse<Ticket>> {
    return http.get<Ticket>('ticket', { params: params })
  }

  static create (params: { ticket_user_id: number, message: string, [key: string]: any }): Promise<AxiosResponse<Ticket>> {
    return http.post<Ticket>('ticket', Ticket.prepareFormData(params))
  }

  static update (params: { [key: string]: any }): Promise<AxiosResponse<Ticket>> {
    return http.post<Ticket>('ticket/' + params.id, Ticket.prepareFormData({...params, "_method": "PUT"}))
  }
}