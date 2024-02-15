import { Link } from "react-router-dom";
import { TProductCartData } from "types/products";
import s from "./styles.module.scss";
import { ButtonCount } from "components/button-count/ButtonCount";
import { ProductPrice } from "components/product-price/ProductPrice";
import TrashIcon from "./img/trash.svg"
import { GiftLabel } from "../gift-label/GiftLabel";
import { useCart } from "hooks/useCart";

interface ICartItemProps extends TProductCartData {
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

    const productCartData: TProductCartData = { _id, name, pictures, discount, price, wight, quantity }
    const { handleCartCountChange, handleClickDecrement, handleClickIncrement, handleRemoveItem } = useCart(productCartData)

    return (
        <>
            <div className={s.cartItem}>
                <div className={s.cartDesc}>
                    <img src={pictures} alt={name} className={s.cartImage} />
                    <Link to={`/product/${_id}`}><h2 className={s.cartTitle}>{name}</h2></Link>
                    <p className={s.cartWeight}>{wight}</p>
                </div>
                {isGift
                    ? <GiftLabel title="Подарок" text="за первый заказ!" />
                    : <>
                        <ButtonCount
                            amount={quantity}
                            handleIncrement={handleClickIncrement}
                            handleDecrement={handleClickDecrement}
                            handleCountChange={handleCartCountChange}
                        />
                        <div className={s.cartPrice}> <ProductPrice price={price} discount={discount} type="big" align='right' /></div>
                        <button className={s.bntTrash} onClick={handleRemoveItem}><TrashIcon /></button>
                    </>
                }
            </div>
        </>
    );
}
