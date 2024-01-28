import { AxiosResponse } from "axios";
import { RoutePath } from "pages/routeConfig";
import { api } from "utils/api";
import { TProductsResponseDto } from "../../../types/userApi";
import { getLocalData } from "utils/local-storage";

export class ProductsService {

    getProducts(): Promise<AxiosResponse<TProductsResponseDto>> {
        return api.get(RoutePath.products, {headers: {Authorization: getLocalData("token")}})
    }

    // fetchSearchRequest(searchValue: string): Promise<AxiosResponse<TSpotRoutes>> {
        
    //     const requestPath = `${RoutePath.spots}?search=${searchValue}`
    //     return api.get(requestPath);
    // }
}

export const productsApi = new ProductsService();