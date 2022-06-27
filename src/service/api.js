import axios from "axios";

const apiClient = axios.create({
    baseURL: '',
    withCredential: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default apiClient;