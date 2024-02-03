import { SerializedError, createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "storage/hookTypes"
import { UserReviewBodyDto } from "types/products"
import { TProductResponseDto } from "types/typesApi"
import { isLiked } from "utils/products"

type TProductState = {
    data: TProductResponseDto | null,
    loading: boolean,
    error: SerializedError | null | unknown,
}

const initialState: TProductState = {
    data: null,
    loading: true,
    error: null
}

export const sliceName = 'product-item'

export const fetchProductItem = createAppAsyncThunk<TProductResponseDto, string>(
    `${sliceName}/fetchProductItem`,
    async (productId, { fulfillWithValue, rejectWithValue, extra: {productApi} }) => {
        try {
            const data = (await productApi.getProductItem(productId)).data
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchCreateReview = createAppAsyncThunk<TProductResponseDto, {productId: string, data: UserReviewBodyDto}>( 
   `${sliceName}/fetchCreateReview`,
   async ({productId, data: body}, {fulfillWithValue,rejectWithValue, extra: {productApi}}) => {
        try {
            const data = (await productApi.createProductReview(productId, body)).data;
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const productSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        changeLikeState: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder //как в switch-case:

            //Product-item
            .addCase(fetchProductItem.pending, (state) => { //{type: 'products/fetchProducts/pending', payload (какие-то данные {...}}
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductItem.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload;
                state.loading = false
            })
            .addCase(fetchProductItem.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
        //Create review
        .addCase(fetchCreateReview.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
            state.data = action.payload;
        })
        .addCase(fetchCreateReview.rejected, (state, action) => {
            state.error = action.payload;

        })

    }
})
export const { changeLikeState } = productSlice.actions
export const productReducer = productSlice.reducer
