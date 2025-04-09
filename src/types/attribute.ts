import { IAttributeValue } from "./attributeValue";
import { IBaseResponse } from "./base";

export interface IAttribute {
    _id: string,
    name: string,
    values: IAttributeValue[],
    createdAt: string,
}


export interface IAttributeResponse extends IBaseResponse {
    data: IAttribute[]
}
