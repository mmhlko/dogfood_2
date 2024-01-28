import axios from "axios";
import { getToken } from "./auth";
import { getLocalData } from "./local-storage";

export const AUTH_TOKEN = getToken()
export const api = axios.create({});

api.defaults.baseURL = "https://api.react-learning.ru";
api.defaults.headers.common["Authorization"] = AUTH_TOKEN;