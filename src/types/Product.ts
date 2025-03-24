export interface IProduct {
    id: number;
    name: string;
    description: string;
    sell_price: number;
    buy_price: number;
    stock: number;
    status: boolean;
    image: string;
    variants: IVariant[];
}

export interface IVariant {
    key: IVariantKey[];
}

export interface IVariantKey {
    id: number;
    value: string;
}
