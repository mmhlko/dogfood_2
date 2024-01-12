import { calcDiscountPrice } from "utils/products";
import s from "./styles.module.scss";
import classNames from 'classnames';

interface IProductPriceProps {
  discount: number,
  price: number,
  type: string,
  align?: string
}

export const ProductPrice = ({ discount, price, type, align = "left" }:IProductPriceProps) => {
  const discount_price = calcDiscountPrice(price, discount);

  return (
    <div className={classNames({ [s[`${type}Price`]]: type }, s.priceWrap)}>
      <span className={classNames({ [s.oldPrice]: discount, [s.price]: !discount, [s[align]]: align })}>{price}&nbsp;₽</span>
      {discount !== 0 && <span className={classNames(s.price, s.priceDiscount)}>{discount_price}&nbsp;₽</span>}
    </div>
  );
}