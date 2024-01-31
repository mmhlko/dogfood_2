import { AxiosResponse } from "axios";
import { RoutePath } from "pages/routeConfig";
import { TUserPassword, TUserResponseDto } from "types/userApi";
import { api } from "utils/api";
import { getToken } from "utils/auth";

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
    passwordReset(password: TUserPassword) {
        return api.patch(`/password-reset/${getToken()}`, password)
    }
    checkToken(token: string): Promise<AxiosResponse<TUserResponseDto>> {
        return api.get("/users/me", {headers: {Authorization: token}})
    }
}

export const authApi = new AuthService();