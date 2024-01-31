import { useAppSelector } from "storage/hookTypes";
import s from "./styles.module.scss";
import { cartInfoSelector } from "modules/cart";
import classNames from "classnames";
import { store } from "storage/store";

export const CartAmount = () => {
    const state = store.getState()
    const { amount, amountWithDiscount, totalDiscount, totalCount } = cartInfoSelector(state);

    return (
        <div className={s.cartAmount}>
            <h1 className={s.title}>Ваша корзина</h1>
            <div className={s.table}>
                <div className={s.tableRow}>
                    <span className={s.tableTitle}>Товары ({totalCount})</span>
                    <span className={s.tableValue}>{amount} ₽</span>
                </div>
                {totalDiscount !== 0 && (<div className={s.tableRow}>
                    <span className={s.tableTitle}>Скидка</span>
                    <span className={classNames(s.tableValue, s.tableValueDiscount)}>- {totalDiscount} ₽</span>
                </div>)}
            </div>
            <div className={s.totalCost}>
                <h2 className={s.totalCostTitle}>Общая стоимость</h2>
                <span className={s.totalCostValue}>{amountWithDiscount} ₽</span>
            </div>
            <div className="btn btn_type_primary btn_type_wide">Оформить заказ</div>
        </div>
    );
}