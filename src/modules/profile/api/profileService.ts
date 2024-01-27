import { AxiosResponse } from "axios";
import { TUserBaseInfo, TUserResponseDto } from "types/userApi";
import { api } from "utils/api";

export type TAuthResponse = {
    data: TUserResponseDto;
}

class ProfileService {
    setUserBaseInfo(data: TUserBaseInfo): Promise<AxiosResponse<TUserResponseDto>> {
        return api.patch("/users/me", data);
    }
    setUserAvatar(avatar: string): Promise<AxiosResponse<TUserResponseDto>> {
        return api.patch("/users/me/avatar", {avatar: avatar});
    }
}

export const profileApi = new ProfileService();