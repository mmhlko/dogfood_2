import { useAppSelector } from "storage/hookTypes";
import s from "./styles.module.scss";

export const CartInfo = () => {
    const { totalCountProducts } = useAppSelector(state => state.cart);

    return (
        <div className={s.cartTitle}>
            <span>{totalCountProducts} товаров</span> в корзине
        </div>
    );
}