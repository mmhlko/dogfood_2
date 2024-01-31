import { NotFound } from "ui/not-found/NotFound";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "storage/hookTypes";
import s from './styles.module.scss';
import { CartAmount } from "./cart-amount/CartAmount";
import { CartInfo } from "./cart-info/CartInfo";
import { CartList } from "./cart-list/Cartlist";

export const Cart = () => {
    const productsCart = useAppSelector(state => state.cart.data);
    const navigate = useNavigate();

    return (
        <>
            {productsCart.length === 0
                ? <NotFound buttonText='На главную' title="В корзине нет товаров" buttonAction={() => { navigate('/') }} />
                : (
                    <div className={s.contentCart}>
                        <CartInfo />
                        <CartList productsCart={productsCart} />
                        <CartAmount />
                    </div>
                )
            }
        </>
    )
}