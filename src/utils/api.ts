import axios from "axios";
import { getToken } from "./auth";

export const AUTH_TOKEN = getToken() || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRmNzAyYjhmYmM0NzNmYThhMTVkMTQiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNzAxODg2NjMwLCJleHAiOjE3MzM0MjI2MzB9.RaOCO-D8lTond_rk74GPiP9-v3BkF5l-5Bxed6oB_W8";
export const api = axios.create();

api.defaults.baseURL = "https://api.react-learning.ru";
api.defaults.headers.common["Authorization"] = AUTH_TOKEN;