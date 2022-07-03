import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_PROXY,
    withCredential: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default apiClient;