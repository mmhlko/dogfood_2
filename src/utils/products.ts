import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TProduct, TProductCartData } from 'types/products';

export interface IcheckProductInCart {
    quantity: number, 
    exist: boolean
}

dayjs.locale('ru');
export function formattedDate(date: Date) {
    const data = dayjs(date).format("DD MMM YYYY");
    return data.replace('.', "");
}

export const isLiked = (likes: string[], userId:string) => likes?.some(id => id === userId)
export const calcDiscountPrice = (price:number, discount:number) => Math.round(price * (1 - discount/100) )

export const checkProductInCart = (cartProducts: TProductCartData[], productID: string):IcheckProductInCart => {
    const productInCart = cartProducts.find(cartProduct => cartProduct._id === productID)
    return productInCart?.quantity ? {quantity: productInCart.quantity, exist: true} : {quantity: 0, exist: false}
}

export const getProductCartData = (productData: TProduct) => {
    const { _id, name, pictures, discount, price, wight, /* quantity */ } = productData
    return { _id, name, pictures, discount, price, wight }
}