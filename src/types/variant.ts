export interface IVariant {
    _id?: string;
    productId?: string;
    options: { [key: string]: string };
    stock: number;
    sku: string;
    createdAt?: string;
    updatedAt?: string;
}
