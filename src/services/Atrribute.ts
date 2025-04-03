import instanceAxios from "../utils/instanceAxios"

const fetchAttributes = async () => {
    try {
        const { data } = await instanceAxios.get("/attributes");
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const AttributeServices = {
    fetchAttributes
}

