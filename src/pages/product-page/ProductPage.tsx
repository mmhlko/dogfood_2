import { fetchChangeProductLike } from "modules/card-list/store/productsSlice";
import Product from "modules/product/components/Product";
import { fetchProductItem } from "modules/product/store/productSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "storage/hookTypes";
import { NotFound } from "ui/not-found/NotFound";
import { Spinner } from "ui/spinner/Spinner";

const ProductPage = () => {

    const { productId } = useParams();
    const dispatch = useAppDispatch();
    const { fetchProductItemLoading: isProductLoading, fetchProductItemError: productError, data: product } = useAppSelector(state => state.product)

    const handleProductLike = (product: { likes: string[], _id: string }) => {
        dispatch(fetchChangeProductLike({ likes: product.likes, _id: product._id }))
    }

    useEffect(() => {
        productId && dispatch(fetchProductItem(productId))
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