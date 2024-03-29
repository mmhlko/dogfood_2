import { TStateError } from "storage/reduxTypes"
import { TProductResponseDto } from "types/typesApi"
import { TABS_ID } from "../constants/constants"

export type TProductsState = {
    data: TProductResponseDto[],
    currentSort: TABS_ID,
    defaultSort: TProductResponseDto[],
    favoriteProducts: TProductResponseDto[],
    total: number,
    loading: boolean,
    error: TStateError,
    currentPage: number,
    totalPages: number
    currentStartPage: number,
    currentEndPage: number,
    searchQuery: string,
    isSearchFulfilled: boolean,
    fetchSearchProductsLoading: boolean,
    fetchSearchProductsError: TStateError
}