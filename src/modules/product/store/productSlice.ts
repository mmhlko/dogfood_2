import { SerializedError, createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "storage/hookTypes"
import { TProductResponseDto } from "types/userApi"
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
    async (productId, { fulfillWithValue, rejectWithValue, extra: api }) => {
        try {
            const data = (await api.productApi.getProductItem(productId)).data
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// export const fetchCreateReview = createAppAsyncThunk<TProductResponseDto, {productId: string, data: UserReviewBodyDto}>( 
//     //асинхронный action, принимает имя асинх.экшена, а вторым - асинх. функция payload-creator которая генерирует payload
//     //ее задача вернуть payload, который будет использоваться в экшене редьюсера
//    /* arg1 */ `${sliceName}/fetchCreateReview`,
//    /* arg2 */ async function payloadCreator({productId, data: body}, {fulfillWithValue,rejectWithValue, extra: api}) {
//         try {
//             const data = await api.createReviewProduct(productId, body);
//             return fulfillWithValue(data) //action.payload = {products: [], total: 0}
//         } catch (error) {
//             return rejectWithValue(error) //возвращается при ошибке
//         }
//     }
// )

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
        // .addCase(fetchCreateReview.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
        //     state.data = action.payload;
        // })
        // .addCase(fetchCreateReview.rejected, (state, action) => {
        //     state.error = action.payload;

        // })

    }
})
export const { changeLikeState } = productSlice.actions
export const productReducer = productSlice.reducer
