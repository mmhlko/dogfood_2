import { AxiosResponse } from "axios";
import { RoutePath } from "pages/routeConfig";
import { UserReviewBodyDto } from "types/products";
import { TProductResponseDto } from "types/typesApi";
import { api } from "utils/api";

export class ProductService {

    getProductItem(id: string): Promise<AxiosResponse<TProductResponseDto>> {
        return api.get(`${RoutePath.products}/${id}`)
    }
    changeProductLikeStatus(id: string, isLiked: boolean): Promise<AxiosResponse<TProductResponseDto>> {
        return api[isLiked? 'delete' : 'put'](`${RoutePath.products}/likess/${id}`)
    }
    createProductReview(id: string, review: UserReviewBodyDto): Promise<AxiosResponse<TProductResponseDto>> {
        return api.post(`/products/review/${id}`, review)
    }
}

export const productApi = new ProductService();