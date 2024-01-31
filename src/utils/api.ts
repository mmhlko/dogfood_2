import axios from "axios";
import { getToken } from "./auth";

export const api = axios.create();

api.defaults.baseURL = "https://api.react-learning.ru";
api.defaults.headers.common["Authorization"] = getToken();
api.interceptors.request.use((config) => {
    if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${getToken()}`;
    }
    return config;
}, (error) => Promise.reject(error)
);