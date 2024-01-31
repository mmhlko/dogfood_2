import { RoutePath } from "pages/routeConfig";
import { Link } from "react-router-dom";
import { useAppDispatch } from "storage/hookTypes";
import { TProductInCart } from "types/products";
import s from "./styles.module.scss";
import ButtonCount from "components/button-count/ButtonCount";
import { changeProductQuantityCart, decrementQuantityCart, incrementQuantityCart, removeProductCart } from "modules/cart";
import { ProductPrice } from "components/product-price/ProductPrice";
import TrashIcon from "./img/trash.svg"
import { GiftLabel } from "../gift-label/GiftLabel";

interface ICartItemProps extends TProductInCart {
}
export function CartItem({
    name,
    price,
    discount,
    wight,
    pictures,
    _id,
    quantity,
    isGift
}: ICartItemProps) {

    const addDataProduct = { _id, name, pictures, discount, price, wight, quantity }
    const dispatch = useAppDispatch();

    return (
        <>
            <div className={s.cartItem}>
                <div className={s.cartDesc}>
                    <img src={pictures} alt={name} className={s.cartImage} />
                    <Link to={`${RoutePath.product}/${_id}`}><h2 className={s.cartTitle}>{name}</h2></Link>
                    <p className={s.cartWeight}>{wight}</p>
                </div>
                {!isGift && <ButtonCount
                    amount={quantity}
                    handleIncrement={() => { dispatch(incrementQuantityCart(addDataProduct)) }}
                    handleDecrement={() => { dispatch(decrementQuantityCart(addDataProduct)) }}
                    handleCountChange={(newQuantity) => { dispatch(changeProductQuantityCart({ ...addDataProduct, quantity: newQuantity })) }}
                />}
                {!isGift && <div className={s.cartPrice}> <ProductPrice price={price} discount={discount} type="big" align='right' /></div>}
                {!isGift && <button className={s.bntTrash} onClick={() => { dispatch(removeProductCart(addDataProduct)) }}><TrashIcon /></button>}
                {isGift && <GiftLabel title="Подарок" text="за первый заказ!" />}
            </div>
        </>
    );
}
