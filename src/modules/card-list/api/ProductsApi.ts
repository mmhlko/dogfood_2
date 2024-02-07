import { AxiosResponse } from "axios";
import { RoutePath } from "pages/routeConfig";
import { TProduct } from "types/products";
import { TProductResponseDto, TProductsResponseDto } from "types/typesApi";
import { api } from "utils/api";

export class ProductsService {

    getProducts(): Promise<AxiosResponse<TProductsResponseDto>> {
        return api.get(RoutePath.products)
    }

    fetchSearchRequest(searchValue: string): Promise<AxiosResponse<TProduct[]>> {        
        const requestPath = `${RoutePath.products}/search?query=${searchValue}`
        return api.get(requestPath);
    }
}

export const productsApi = new ProductsService();