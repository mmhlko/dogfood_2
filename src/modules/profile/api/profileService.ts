import { AxiosResponse } from "axios";
import { TUserResponseDto } from "types/typesApi";
import { TUserBaseInfo } from "types/user";
import { api } from "utils/api";

export type TAuthResponse = {
    data: TUserResponseDto;
}

class ProfileService {
    setUserBaseInfo(data: TUserBaseInfo): Promise<AxiosResponse<TUserResponseDto>> {
        return api.patch("/users/me", data);
    }
    setUserAvatar(url: string): Promise<AxiosResponse<TUserResponseDto>> {
        return api.patch("/users/me/avatar", {avatar: url});
    }
}

export const profileApi = new ProfileService();