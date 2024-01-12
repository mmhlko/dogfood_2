import { TUser } from "modules/auth-form/types/user";
import { TProduct } from "../modules/card-list/types/products";

export type ServerResponse<T> = {
    created_at?: Date,
    updated_at?: Date,
    __v?: number
} & T;

export type TProductResponseDto = ServerResponse<TProduct>
export type TUserResponseDto = ServerResponse<TUser>

export type TProductsResponseDto = {
    products: TProductResponseDto[];
    total: number;
}