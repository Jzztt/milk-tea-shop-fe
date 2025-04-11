import { IBaseResponse } from "./base";

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    image: string;
    hasVariants: boolean;
    createdAt: string;
    updatedAt: string;
    status: boolean;
}


export interface IProductResponse extends IBaseResponse {
    data: IProduct[];
}

