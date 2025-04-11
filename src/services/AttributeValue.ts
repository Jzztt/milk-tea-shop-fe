import instanceAxios from "../utils/instanceAxios";

const getAllAttributeValue = async () => {
    try {
        const { data } = await instanceAxios.get("/attribute-values");
        return data.data

    } catch (error) {
        console.log(error);

    }
}

const createAttributeValue = async (payload) => {
    try {
        const { data } = await instanceAxios.post("/attribute-values", payload);
        return data.data

    } catch (error) {
        console.log(error);

    }
}

export const AttributeValueServices = { getAllAttributeValue, createAttributeValue }