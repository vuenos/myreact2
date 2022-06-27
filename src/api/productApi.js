import apiClient from "../service/Api";

export const getProducts = async () => {
    const { data } = await apiClient.get('');
    return data.result.data;
}