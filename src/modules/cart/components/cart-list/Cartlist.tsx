import { TProductCartData } from 'types/products';
import { CartItem } from '../cart-item/CartItem';
import s from "./styles.module.scss";

interface ICartListProps {
    productsCart: (TProductCartData)[];
}

export const CartList = ({ productsCart }: ICartListProps) => {

    const cartItemRender = (dataItem: TProductCartData, index: number) => (
        <CartItem key={index} {...dataItem} />
    )

    return (
        <div className={s.cartList}>
            {productsCart.map(cartItemRender)}
        </div>
    );
}