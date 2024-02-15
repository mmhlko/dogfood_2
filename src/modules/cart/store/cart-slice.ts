import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import { RootState, TStoreAction } from "storage/reduxTypes";
import { logout } from "storage/user/userSlice";
import { TProductCartData } from "types/products";
import { calcDiscountPrice } from "utils/products";

type TCartState = {
    totalCountProducts: number,
    data: TProductCartData[],
    userId: string
}

const initialState: TCartState = {
    data: [],
    totalCountProducts: 0,
    userId: null
}

enum ECartData {
    amount = "amount",
    amountWithDiscount = "amountWithDiscount",
    totalDiscount = "totalDiscount",
    totalCount = "totalCount"
}

interface ICartInfo {
    [ECartData.amount]: number,
    [ECartData.amountWithDiscount]: number,
    [ECartData.totalDiscount]: number,
    [ECartData.totalCount]: number
}

export const sliceName = 'cart';

const selectECartData = (state: RootState) => state.cart.data;

export const cartInfoSelector: Selector<RootState, ICartInfo> = createSelector(
    selectECartData,
    (cart) => {
        return cart.reduce(
            (total, item: TProductCartData) => {
                const priceDiscount = calcDiscountPrice(item.price, item.discount);
                total[ECartData.amount] += item.price * item.quantity;
                total[ECartData.amountWithDiscount] += (priceDiscount * item.quantity);
                total[ECartData.totalDiscount] += (item.price - priceDiscount) * item.quantity;
                total[ECartData.totalCount] += item.quantity;

                return total;
            },
            {
                [ECartData.amount]: 0,
                [ECartData.amountWithDiscount]: 0,
                [ECartData.totalDiscount]: 0,
                [ECartData.totalCount]: 0
            }
        )
    }
)

const cartSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        addProductToCart: (state, action: TStoreAction<TProductCartData>) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id);
            itemInCart ? itemInCart.quantity++ : state.data.push({ ...action.payload, quantity: 1 })
            state.totalCountProducts++;
        },
        removeProductFromCart: (state, action: TStoreAction<TProductCartData>) => {
            state.data = state.data.filter(item => {
                if (item._id === action.payload._id) {
                    state.totalCountProducts = state.totalCountProducts - action.payload.quantity;
                }
                return item._id !== action.payload._id
            })
        },
        changeProductQuantityCart: (state, action: TStoreAction<TProductCartData>) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id);
            if (itemInCart) {
                if (itemInCart.quantity < action.payload.quantity) {
                    state.totalCountProducts += action.payload.quantity - itemInCart.quantity;
                } else {
                    state.totalCountProducts -= itemInCart.quantity - action.payload.quantity;
                }
            }
            if (itemInCart && action.payload.quantity > 0) {
                itemInCart.quantity = action.payload.quantity;
            } else {
                state.data.push({ ...action.payload, quantity: action.payload.quantity })
            }
        },
        incrementQuantityCart: (state, action: TStoreAction<TProductCartData>) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id); //undefined or product
            if (itemInCart) {
                itemInCart.quantity++
            } else {
                state.data.push({ ...action.payload, quantity: 1 })
            }
            state.totalCountProducts++;
        },
        decrementQuantityCart: (state, action: TStoreAction<TProductCartData>) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id); //undefined or product
            if (itemInCart) {
                if (itemInCart.quantity === 1) {
                    itemInCart.quantity = 1;
                } else {
                    itemInCart.quantity--;
                    state.totalCountProducts--;
                }
            }
        },
        cartClear: (state) => {
            state.totalCountProducts = 0
        },
        checkUserCart: (state, action: TStoreAction<string>) => {
            if (action.payload !== state.userId) {
                return { ...initialState, userId: action.payload }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout, () => {
                return initialState
            })
    }
})

export const {
    addProductToCart,
    removeProductFromCart,
    incrementQuantityCart,
    decrementQuantityCart,
    changeProductQuantityCart,
    cartClear,
    checkUserCart
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;