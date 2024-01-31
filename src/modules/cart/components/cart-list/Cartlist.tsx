import { TProductInCart } from 'types/products';
import { CartItem } from '../cart-item/CartItem';
import s from "./styles.module.scss";

interface ICartListProps {
    productsCart: (TProductInCart)[];
}

export const CartList = ({ productsCart }: ICartListProps) => {

    const cartItemRender = (dataItem: TProductInCart, index: number) => (
        <CartItem key={index} {...dataItem} />
    )

    return (
        <div className={s.cartList}>
            {productsCart.map(cartItemRender)}
        </div>
    );
}