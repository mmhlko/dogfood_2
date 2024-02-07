import { SerializedError } from "@reduxjs/toolkit";
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type TStateError = SerializedError | null | unknown;
export type TStoreAction<T> = {
    payload: T,
    type: string
}