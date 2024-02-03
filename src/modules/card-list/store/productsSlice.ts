import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { END_RANGE_PAGE, MAX_PRODUCT_PER_PAGE, START_RANGE_PAGE, TABS_ID } from "../constants/constants"
import { createAppAsyncThunk } from "storage/hookTypes"
import { TProductResponseDto } from "types/typesApi"
import { isLiked } from "utils/products"
import { logout } from "storage/user/userSlice"

export type TProductsState = {
    data: TProductResponseDto[],
    currentSort: string,
    defaultSort: any,
    favoriteProducts: TProductResponseDto[],
    total: number,
    loading: boolean,
    error: SerializedError,
    //pagination
    currentPage: number,
    totalPages: number
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
    currentStartPage: START_RANGE_PAGE,
    currentEndPage: END_RANGE_PAGE,
}

const sliceName = "products";

export const fetchProducts = createAppAsyncThunk( //& { currentUser: TUserResponseDto | null }
    `${sliceName}/fetchProducts`,
    async (_, { fulfillWithValue, rejectWithValue, getState, extra: { productsApi } }) => {
        try {
            const { user } = await getState();//запрос другого среза через getState
            const data = (await productsApi.getProducts()).data
            return fulfillWithValue({ ...data, currentUser: user.data })
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
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
        onClickCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        onPaginateNext: (state) => {
            state.currentPage++;
        },
        onPaginatePrev: (state) => {
            state.currentPage--;
        },
    },
    extraReducers(builder) {
        builder //как в switch-case:
            //Products
            .addCase(fetchProducts.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                const { products, total, currentUser } = action.payload; //(см. fetchProducts) деструктурируем поля из  в action.payload, чтоб постоянно не писать action.payload.currentUser._id
                state.data = products; //то что приходит по запросу продуктов, массив с товарами                
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
            .addCase(fetchChangeProductLike.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                const { product, liked } = action.payload; //деструктурируем поля в action.payload, чтоб постоянно не писать action.payload.currentUser._id
                state.data = state.data.map(cardState => { //карточка в стейте cards
                    return cardState._id === product._id ? product : cardState
                })
                if (!liked) { //если лайка не было, то при нажатии на лайк карточка добвится в массив избранных карточек
                    state.favoriteProducts.push(product) //можно пушить напрямую, а в useState нельзя, поэтому ниже добавляется через спред
                } else { //если лайк стоял, лайк убирается и возвращается отфильтрованный массив в стейт избранных карточек
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
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;