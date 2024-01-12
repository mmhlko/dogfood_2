import { AxiosResponse } from "axios";
import { RoutePath } from "pages/routeConfig";
import { TUserResponseDto } from "types/api";
import { api } from "utils/api";

export type TAuthResponse = {
    data: TUserResponseDto;
    token: string;
}

export type TLoginFormData = {
    email: string, 
    password: string
}

export type TRegisterFormData = {
    group: string
} & TLoginFormData

class AuthService {
    login(formData: TLoginFormData): Promise<AxiosResponse<TAuthResponse>> {
        return api.post(RoutePath.login, formData);
    }
    register(formData: TRegisterFormData): Promise<AxiosResponse<TUserResponseDto>> {
        return api.post(RoutePath.register, formData);
    }
    passwordReset(token:string, password:string) { //изменение пользователя
        return api.patch(`/forgot-password/${token}`, {password: password})
    }
    checkToken(): Promise<AxiosResponse<TUserResponseDto>> {
        return api.get("/users/me")
    }
    


    // static async register(nickname: string, email: string, password: string): Promise<AxiosResponse<TAuthResponse>> {
    //     return api.post(RoutePath.auth_register, { nickname, email, password });
    // }

    // static async logout(): Promise<void> {
    //     return api.post<typeof RoutePath.auth_logout, null, void>(RoutePath.auth_logout);
    // }
}

export const authApi = new AuthService();