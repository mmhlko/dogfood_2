import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { payloadCreatorError } from "storage/helpers"
import { createAppAsyncThunk } from "storage/hookTypes"
import { TStoreAction } from "storage/reduxTypes"
import { UserReviewBodyDto } from "types/products"
import { TProductResponseDto } from "types/typesApi"
import { TProductState } from "../types/store"
import { getActionName } from "utils/redux"

const initialState: TProductState = {
    data: null,
    fetchProductItemLoading: true,
    fetchCreateReviewLoading: false,
    fetchProductItemError: null,
    fetchCreateReviewError: null
}

export const sliceName = 'product-item'

export const fetchProductItem = createAppAsyncThunk<TProductResponseDto, string>(
    `${sliceName}/fetchProductItem`,
    async (productId, { fulfillWithValue, rejectWithValue, extra: { productApi } }) => {
        try {
            const data = (await productApi.getProductItem(productId)).data
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(payloadCreatorError(error))
        }
    }
)

export const fetchCreateReview = createAppAsyncThunk<TProductResponseDto, { productId: string, data: UserReviewBodyDto }>(
    `${sliceName}/fetchCreateReview`,
    async ({ productId, data: body }, { fulfillWithValue, rejectWithValue, extra: { productApi } }) => {
        try {
            const data = (await productApi.createProductReview(productId, body)).data;
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(payloadCreatorError(error))
        }
    }
)

const productSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        changeLikeState: (state, action: TStoreAction<TProductResponseDto>) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isFulfilled(fetchProductItem, fetchCreateReview),
                (state, action) => {
                    return {
                        ...state,
                        data: action.payload,
                        [`${getActionName(action.type)}Loading`]: false,
                    }
                }
            )
            .addMatcher(
                isPending(fetchProductItem, fetchCreateReview),
                (state, action) => {
                    return {
                        ...state,
                        [`${getActionName(action.type)}Loading`]: true,
                        [`${getActionName(action.type)}Error`]: null
                    }
                })
            .addMatcher(
                isRejected(fetchProductItem, fetchCreateReview),
                (state, action) => {
                    return {
                        ...state,
                        [`${getActionName(action.type)}Loading`]: false,
                        [`${getActionName(action.type)}Error`]: action.payload
                    }
                })
    }
})
export const { changeLikeState } = productSlice.actions
export const productReducer = productSlice.reducer
