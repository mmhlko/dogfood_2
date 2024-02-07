import { createSlice } from "@reduxjs/toolkit"
import { END_RANGE_PAGE, START_RANGE_PAGE, TABS_ID } from "../constants/constants"
import { createAppAsyncThunk } from "storage/hookTypes"
import { TProductResponseDto } from "types/typesApi"
import { isLiked } from "utils/products"
import { logout } from "storage/user/userSlice"
import { TProductsState } from "../types/store"
import { TStoreAction } from "storage/reduxTypes"
import { payloadCreatorError } from "storage/helpers"
import { TProduct } from "types/products"
import { getTotalPages } from "../helpers/getPaginateData"
import { changeLikeState } from "modules/product/store/productSlice"

const initialState: TProductsState = {
    data: [],
    currentSort: '',
    defaultSort: null,
    favoriteProducts: [],
    total: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    currentStartPage: START_RANGE_PAGE,
    currentEndPage: END_RANGE_PAGE,
    searchQuery: "",
    isSearchFulfilled: false,
    fetchSearchProductsLoading: false,
    fetchSearchProductsError: null
}

const sliceName = "products";

export const fetchProducts = createAppAsyncThunk(
    `${sliceName}/fetchProducts`,
    async (_, { fulfillWithValue, rejectWithValue, getState, extra: { productsApi } }) => {
        try {
            const { user } = await getState();
            const data = (await productsApi.getProducts()).data
            return fulfillWithValue({ ...data, currentUser: user.data })
        } catch (error) {
            return rejectWithValue(payloadCreatorError(error))
        }
    }
)

export const fetchSearchProducts = createAppAsyncThunk<TProduct[], string>(
    `${sliceName}/fetchSearchProducts`,
    async (searchQuery, { fulfillWithValue, rejectWithValue, dispatch, extra: { productsApi } }) => {
        try {            
            const data = (await productsApi.fetchSearchRequest(searchQuery)).data
            dispatch(setSearchQuery(searchQuery))
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(payloadCreatorError(error))
        }
    }
)

export const fetchChangeProductLike = createAppAsyncThunk<{ product: TProductResponseDto, liked: boolean }, { likes: string[], _id: string }>(
    `${sliceName}/fetchChangeLikeProduct`,
    async (product, { fulfillWithValue, rejectWithValue, getState, dispatch, extra: { productApi } }) => {
        try {
            const { user } = await getState();
            const liked = user.data ? isLiked(product.likes, user.data._id) : false;
            const data = (await productApi.changeProductLikeStatus(product._id, liked)).data; //получение обновленной карточки
            data && dispatch(changeLikeState(data))
            return fulfillWithValue({ product: data, liked })
        } catch (error) {            
            return rejectWithValue(payloadCreatorError(error))
        }
    }
)

export const productsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        onChangeProductSort: (state, action: TStoreAction<string>) => {
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
        onClickCurrentPage: (state, action: TStoreAction<number>) => {
            state.currentPage = action.payload;
        },
        onPaginateNext: (state) => {
            state.currentPage++;
        },
        onPaginatePrev: (state) => {
            state.currentPage--;
        },
        onChangeCurrentPage: (state, action: TStoreAction<number>) => {
            switch (true) {
                case (action.payload > 3 && action.payload < state.totalPages - 2):
                    state.currentStartPage = action.payload - 1
                    state.currentEndPage = action.payload + 1
                    break;
                case (action.payload >= state.totalPages - 2):
                    state.currentStartPage = state.totalPages - 3
                    state.currentEndPage = state.totalPages - 1
                    break;
                default:
                    state.currentStartPage = START_RANGE_PAGE
                    state.currentEndPage = END_RANGE_PAGE
                    break;
            }
        },
        setSearchQuery: (state, action: TStoreAction<string>) => {
            state.searchQuery = action.payload
        },
        resetSearchRequest: (state) => {
            state.isSearchFulfilled = false
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchProducts.pending, (state) => {
                state.fetchSearchProductsLoading = true;
                state.fetchSearchProductsError = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {

                const { products, currentUser } = action.payload;
                state.data = products;
                state.defaultSort = state.data.slice();
                state.total = products.length;
                state.totalPages = getTotalPages(state.total);
                if (currentUser) {
                    state.favoriteProducts = products.filter(item => isLiked(item.likes, currentUser._id))
                }
                state.loading = false;
            })
            .addCase(fetchSearchProducts.fulfilled, (state, action) => {

                const products = action.payload;
                state.isSearchFulfilled = true
                state.data = products;
                state.defaultSort = state.data.slice();
                state.total = products.length;
                state.totalPages = getTotalPages(state.total);
                state.fetchSearchProductsLoading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(fetchSearchProducts.rejected, (state, action) => {
                state.fetchSearchProductsError = action.payload;
                state.fetchSearchProductsLoading = false;
            })
            .addCase(fetchChangeProductLike.fulfilled, (state, action) => {
                console.log("fetchChangeProductLike", action.payload);
                
                const { product, liked } = action.payload;
                state.data = state.data.map(cardState => {
                    return cardState._id === product._id ? product : cardState //обновление карточки в списке, если id совпали
                })
                if (!liked) { //обновление избранных товаров
                    state.favoriteProducts.push(product)
                } else {
                    state.favoriteProducts = state.favoriteProducts.filter(card => card._id !== product._id)
                }
            })
            .addCase(fetchChangeProductLike.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(logout, () => {
                return initialState
            })
    },
})

export const {
    onChangeProductSort,
    onClickCurrentPage,
    onPaginateNext,
    onPaginatePrev,
    onChangeCurrentPage,
    setSearchQuery,
    resetSearchRequest
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;