import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./reduxTypes";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "modules/card-list/api/ProductsApi";
import { authApi } from "modules/auth-form/api/authApi";
import { productApi } from "modules/product/api/ProductApi";
import { profileApi } from "modules/profile/api/profileService";
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
    extra: {
        authApi: typeof authApi,
        productsApi: typeof productsApi,
        productApi: typeof productApi,
        profileApi: typeof profileApi
    }
}>()