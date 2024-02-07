import { TStateError } from "storage/reduxTypes";
import { TProductResponseDto } from "types/typesApi";

export type TProductState = {
    data: TProductResponseDto | null,
    fetchProductItemLoading: boolean,
    fetchCreateReviewLoading: boolean,
    fetchProductItemError: TStateError,
    fetchCreateReviewError: TStateError
}