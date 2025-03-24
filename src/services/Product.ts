import { IProduct } from "../types/Product";
import instanceAxios from "../utils/instanceAxios"

const fetchProducts = async () => {
    try {
        const { data } = await instanceAxios.get<IProduct[]>("/products");
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const ProductServices = {
    fetchProducts
}

