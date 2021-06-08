import BaseModel from "@/models/BaseModel";

export default class TicketMessage extends BaseModel {
    message!: string
    author!: string
}