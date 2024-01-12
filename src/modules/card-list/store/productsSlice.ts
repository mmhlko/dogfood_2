import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TProductResponseDto, TProductsResponseDto, TUserResponseDto } from "../../../types/api"
import { TABS_ID } from "../constants/constants"
import { createAppAsyncThunk } from "storage/hookTypes"
import { isLiked } from "utils/products"
//import { apiProducts } from "../api/ProductsApi"

export type TProductsState = {
    data: TProductResponseDto[],
    currentSort: string,
    defaultSort: any,
    favoriteProducts: TProductResponseDto[],
    total: number,
    loading: boolean,
    error: SerializedError | null | string,
    //pagination
    currentPage: number,
    totalPages: number
    productPerPage: number,
    currentStartPage: number,
    currentEndPage: number,
}

const initialState: TProductsState = {
    data: [],
    currentSort: '',
    defaultSort: null,
    favoriteProducts: [], //добавляем новое поле в стейт, т.к. в запросе currentUser уже придет (см. const { user } = await getState())
    total: 0,
    loading: false,
    error: null,
    //pagination
    currentPage: 1,
    totalPages: 1,
    productPerPage: 12,
    currentStartPage: 2,
    currentEndPage: 3,
}

const sliceName = "products";

export const fetchProducts = createAppAsyncThunk( //& { currentUser: TUserResponseDto | null }
    `${sliceName}/fetchProducts`,
    async (_, { fulfillWithValue, rejectWithValue, getState, extra: { productsApi } }) => {
        try {
            //const { user } = await getState();//запрос другого среза через getState
            const data = (await productsApi.getSpots()).data
            return fulfillWithValue({ ...data/* , currentUser: user.data */ })
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
    }
)

export const productsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        sortedProducts: (state, action) => {
            switch (action.payload) {
                case (TABS_ID.CHEAP):
                    state.data = state.data.sort((a, b) => a.price - b.price);
                    state.currentSort = action.payload;
                    break;
                case (TABS_ID.LOW):
                    state.data = state.data.sort((a, b) => b.price - a.price);
                    state.currentSort = action.payload;
                    break;
                case (TABS_ID.DISCOUNT):
                    state.data = state.data.sort((a, b) => b.discount - a.discount);
                    state.currentSort = action.payload;
                    break;
                case (TABS_ID.DEFAULT):
                    state.data = state.defaultSort;
                    state.currentSort = action.payload;
                    break;
                default:
                    state.data = state.defaultSort;
                    state.currentSort = TABS_ID.DEFAULT;
                    break;
            }
        },
    },
    extraReducers(builder) {
        builder //как в switch-case:
            //Products
            .addCase(fetchProducts.pending, (state, action) => { //{type: 'products/fetchProducts/pending', payload (какие-то данные {...}}
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                const { products, total, /* currentUser */ } = action.payload; //(см. fetchProducts) деструктурируем поля из  в action.payload, чтоб постоянно не писать action.payload.currentUser._id
                state.data = products; //то что приходит по запросу продуктов, массив с товарами                
                state.defaultSort = state.data.slice();
                state.total = total;
                state.totalPages = Math.ceil(state.total / state.productPerPage);
                //if (currentUser) state.favoriteProducts = products.filter(item => isLiked(item.likes, currentUser._id))

                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    },
})

export const productsReducer = productsSlice.reducer;