import { TUser } from "modules/auth-form/types/user";
import { TProduct } from "./products";

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

export type TUserBaseInfo = {
    name: string,
    about: string,
    avatar?: string,
    email?:string
}
export type TUserPassword = {
    password: string
}
