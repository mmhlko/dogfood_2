import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "storage/user/userSlice";
import { productsApi } from "modules/card-list/api/ProductsApi";
import { productsReducer } from "modules/card-list/store/productsSlice";
import { productApi } from "modules/product/api/ProductApi";
import { productReducer } from "modules/product/store/productSlice";
import { authApi } from "../modules/auth-form/api/authApi";
import { profileApi } from "modules/profile/api/profileService";
import { cartReducer } from "modules/cart/store/cart-slice";
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'cart',
    storage: storage,
}
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
    reducer: {
        products: productsReducer,
        product: productReducer,
        user: userReducer,
        cart: persistedCartReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    productsApi,
                    authApi,
                    productApi,
                    profileApi
                }
            },
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    }
})

export const persistor = persistStore(store);