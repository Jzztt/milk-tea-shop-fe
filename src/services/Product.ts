import { IProductResponse } from "../types/Product";
import instanceAxios from "../utils/instanceAxios"

const fetchProducts = async () => {
    try {
        const { data } = await instanceAxios.get<IProductResponse>("/products");
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const createProduct = async (payload) => {
    try {
        const { data } = await instanceAxios.post<IProductResponse>("/products", payload);
        return data.data;
    } catch (error) {
        console.log(error);
    }

}

export const ProductServices = {
    fetchProducts,
    createProduct,
}

