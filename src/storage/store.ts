import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "modules/auth-form/api/authService";
import { userReducer } from "modules/auth-form/store/userSlice";
import { productsApi } from "modules/card-list/api/ProductsApi";
import { productsReducer } from "modules/card-list/store/productsSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    productsApi,
                    authApi
                }
            },
        })
    }
})