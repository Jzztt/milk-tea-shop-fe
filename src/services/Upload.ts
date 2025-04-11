import instanceAxios from "../utils/instanceAxios";

const uploadImage = async (file: any) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await instanceAxios.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteImage = async (public_id: string) => {
    try {
        const { data } = await instanceAxios.post("/upload/delete", { public_id });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const UploadService = {
    uploadImage,
    deleteImage
}