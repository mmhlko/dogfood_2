import axios from "axios";
import { getToken } from "./auth";

export const AUTH_TOKEN = getToken();
export const api = axios.create();

api.defaults.baseURL = "https://api.react-learning.ru";
api.defaults.headers.common["Authorization"] = AUTH_TOKEN;