import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "modules/auth-form/api/authService";
import { userReducer } from "modules/auth-form/store/userSlice";
import { productsApi } from "modules/card-list/api/ProductsApi";
import { productsReducer } from "modules/card-list/store/productsSlice";
import { productApi } from "modules/product/api/ProductApi";
import { productReducer } from "modules/product/store/productSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        product: productReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    productsApi,
                    authApi,
                    productApi
                }
            },
        })
    }
})