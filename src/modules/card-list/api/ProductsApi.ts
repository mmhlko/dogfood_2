import { AxiosResponse } from "axios";
import { RoutePath } from "pages/routeConfig";
import { api } from "utils/api";
import { TProductsResponseDto } from "../../../types/typesApi";

export class ProductsService {

    getProducts(): Promise<AxiosResponse<TProductsResponseDto>> {
        return api.get(RoutePath.products)
    }

    // fetchSearchRequest(searchValue: string): Promise<AxiosResponse<TSpotRoutes>> {
        
    //     const requestPath = `${RoutePath.spots}?search=${searchValue}`
    //     return api.get(requestPath);
    // }
}

export const productsApi = new ProductsService();