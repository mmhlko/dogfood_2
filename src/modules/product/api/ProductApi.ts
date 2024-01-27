import { AxiosResponse } from "axios";
import { RoutePath } from "pages/routeConfig";
import { TProductResponseDto } from "types/userApi";
import { api } from "utils/api";

export class ProductService {

    getProductItem(id: string): Promise<AxiosResponse<TProductResponseDto>> {
        return api.get(`${RoutePath.products}/${id}`)
    }
    changeProductLikeStatus(id: string, isLiked: boolean): Promise<AxiosResponse<TProductResponseDto>> {
        return api[isLiked? 'delete' : 'put'](`${RoutePath.products}/likes/${id}`)
    }
}

export const productApi = new ProductService();