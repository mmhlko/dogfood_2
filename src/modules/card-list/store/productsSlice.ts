import { SerializedError, createSlice } from "@reduxjs/toolkit"
import { END_RANGE_PAGE, MAX_PRODUCT_PER_PAGE, START_RANGE_PAGE, TABS_ID } from "../constants/constants"
import { createAppAsyncThunk } from "storage/hookTypes"
import { TProductResponseDto } from "types/typesApi"
import { isLiked } from "utils/products"
import { logout } from "storage/user/userSlice"

type TProductsState = {
    data: TProductResponseDto[],
    currentSort: string,
    defaultSort: any,
    favoriteProducts: TProductResponseDto[],
    total: number,
    loading: boolean,
    error: SerializedError,
    currentPage: number,
    totalPages: number
    currentStartPage: number,
    currentEndPage: number,
}

const initialState: TProductsState = {
    data: [],
    currentSort: '',
    defaultSort: null,
    favoriteProducts: [],
    total: 0,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    currentStartPage: START_RANGE_PAGE,
    currentEndPage: END_RANGE_PAGE,
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
            return rejectWithValue(error)
        }
    }
)

export const fetchChangeProductLike = createAppAsyncThunk<{ product: TProductResponseDto, liked: boolean }, { likes: string[], _id: string }>(
    `${sliceName}/fetchChangeLikeProduct`,
    async (product, { fulfillWithValue, rejectWithValue, getState, extra: { productApi } }) => {
        try {
            const { user } = await getState();
            const liked = user.data ? isLiked(product.likes, user.data._id) : false;
            const data = (await productApi.changeProductLikeStatus(product._id, liked)).data;
            return fulfillWithValue({ product: data, liked })
        } catch (error) {
            return rejectWithValue(error)
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
        onClickCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        onPaginateNext: (state) => {
            state.currentPage++;
        },
        onPaginatePrev: (state) => {
            state.currentPage--;
        },
        onChangeCurrentPage: (state, action) => {
            if (action.payload > 3) {
                state.currentStartPage = action.payload - 1
                state.currentEndPage = action.payload + 1
            } else {
                state.currentStartPage = START_RANGE_PAGE
                state.currentEndPage = END_RANGE_PAGE
            }
        }
    },
    extraReducers(builder) {
        builder
            //Products
            .addCase(fetchProducts.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const { products, total, currentUser } = action.payload;
                state.data = products;
                state.defaultSort = state.data.slice();
                state.total = total;
                state.totalPages = Math.ceil(state.total / MAX_PRODUCT_PER_PAGE);
                if (currentUser) {
                    state.favoriteProducts = products.filter(item => isLiked(item.likes, currentUser._id))
                }
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            //Change Like
            .addCase(fetchChangeProductLike.fulfilled, (state, action) => {
                const { product, liked } = action.payload;
                state.data = state.data.map(cardState => {
                    return cardState._id === product._id ? product : cardState
                })
                if (!liked) {
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
    sortedProducts,
    onClickCurrentPage,
    onPaginateNext,
    onPaginatePrev,
    onChangeCurrentPage
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;