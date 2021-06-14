import {AxiosResponse} from "axios";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";


class RealtyObject extends BaseModel{
  name?: string;
  id_1c?: string;

  static getList(options: { [key: string]: any } = { page: 1 }): Promise<AxiosResponse<Array<RealtyObject>>> {
    return http.get<Array<RealtyObject>>('objects1c', { params: options })
  }
  static create (params: { [key: string]: any }): Promise<AxiosResponse<RealtyObject>> {
    return http.post<RealtyObject>('objects1c', RealtyObject.prepareFormData(params, true))
  }
  static destroy (data: { id: number, [key: string]: any }): Promise<AxiosResponse> {
    return http.delete('objects1c/' + data.id, { params: data })
  }
}

export default RealtyObject
