import { PayloadAction } from "@reduxjs/toolkit";
import { fetchChangeProductLike } from "modules/card-list/store/productsSlice";
import Product from "modules/product/components/Product";
import { changeLikeState, fetchProductItem } from "modules/product/store/productSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "storage/hookTypes";
import { TProductResponseDto } from "types/typesApi";
import { NotFound } from "ui/not-found/NotFound";
import { Spinner } from "ui/spinner/Spinner";

const ProductPage = () => {

    const { productId } = useParams();
    const dispatch = useAppDispatch();
    const { fetchProductItemLoading: isProductLoading, fetchProductItemError: productError, data: product } = useAppSelector(state => state.product)

    const handleProductLike = (product: { likes: string[], _id: string }) => {

        //при нажатии лайка внутри страницы продукта, вызывается глобальная 
        //функция постановки лайка из App, которая возвращает конкретную карточку и обновляет стейт
        dispatch(fetchChangeProductLike({ likes: product.likes, _id: product._id }))
            .then((updatedCard: PayloadAction<
                {
                    product: TProductResponseDto,
                    liked: boolean
                },
                string,
                { arg: { likes: string[]; _id: string; }; requestId: string; requestStatus: "fulfilled"; }
            >) => {
                if (updatedCard?.payload?.product) {
                    dispatch(changeLikeState(updatedCard.payload.product))
                }

                //setProduct(updatedCard.payload.product) //карточка теперь лежит в сторе, поэтому берем из поля payload
            })
    }

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductItem(productId))
        }
    }, [productId])

    return (
        <div className="content container">
            <>
                {isProductLoading
                    ? <Spinner />
                    : !productError && product && <Product onProductLike={handleProductLike} />
                }
                {!isProductLoading && productError && <NotFound title='товар не найден' />}
            </>
        </div>
    )
}

export default ProductPage;