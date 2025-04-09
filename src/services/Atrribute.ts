import instanceAxios from "../utils/instanceAxios";

const fetchAttributes = async () => {
    try {
        const { data } = await instanceAxios.get("/attributes");
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const createAttribute = async (payload: { name: string, status: boolean }) => {
    try {
        const { data } = await instanceAxios.post("/attributes", payload);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const EditAttribute = async (payload: {_id: number| string, name: string, status: boolean}) => {
    try {
        const { data } = await instanceAxios.put(`/attributes/${payload._id}`, payload);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteAttribute = async (id: number| string) => {
    try {
        const { data } = await instanceAxios.delete(`/attributes/${id}`);
        return data.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const AttributeServices = {
    fetchAttributes,
    createAttribute,
    EditAttribute,
    deleteAttribute

}

