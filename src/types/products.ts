import { TUser } from "modules/auth-form/types/user";

export type TProduct = {
    discount: number,
    stock: number,
    available: true,
    pictures: string,
    likes: string[],
    reviews: TReview[],
    tags: string[],
    isPublished: true,
    _id: string,
    name: string,
    author: TUser,
    price: number,
    wight: string,
    description: string,      
}

export type TReview ={
    rating: number,
    _id: string,
    text: string,
    author: TUser,
    product: string,
    city?: string
}

export type TProductCartData = {
    discount: number,
    pictures: string,
    _id: string,
    name: string,
    price: number,
    wight: string,
    quantity?: number
    isGift?: boolean;
}

export type UserReviewBodyDto = {
    rating: number,
    text: string,
    city?: string
}